{
  var timeUnit = {
    "seconds": 1,
    "second": 1,
    "sec": 1,
    "s": 1,

    "minutes": 60,
    "minute": 60,
    "min": 60,
    "m": 60,

    "hours": 3600,
    "hour": 3600,
    "hr": 3600,
    "h": 3600,

    "days": 86400,
    "day": 86400,
    "d": 86400,

    "weeks": 604800,
    "week": 604800,
    "wk": 604800,
    "w": 604800
  };

  var quantityUnit = {
    "ng": 1E-9,
    "mcg": 1E-6,
    "mg": 1E-3,
    "g": 1,
    "kg": 1000
  };

  var intervalUnit = {
    "daily": 86400,
    "od": 86400,
    "qd": 86400,
    "bid": 43200,
    "tid": 28800,
    "qid": 21600,
    "ac": 28800
  };
}

start
  = __ drugName:drugName dose:dose route:route interval:interval? __
    {
      var result = {
      "medicationName": drugName.toLowerCase(),
      "route": route,
      "dosing": dose,
      "interval": interval };

      // Sanity check: if infusion dosing, no interval needed
      result.interval = (result.dosing.infusionTime === null ? result.interval : null);

      // Sanity check: if not an infusion and no interval, error
      if (result.interval === null & result.dosing.infusionTime === null)
        error("No interval or infusion dosing specified.")

      return result;
    }

drugName "drug name"
  = name:[a-zA-Z\- ]+ { return text().trim(); }

dose "drug dose"
  = __ quantity:number __ unit:quantityUnit divisor:unitDivisor?
    {
      var result = {
        quantity: {
          scalar: parseFloat(quantity),
          unit: quantityUnit[unit]
        }
      };

      // Check if there is a unit divisor (weight-based or time-based)
      if (divisor === null) {
        result.perWeightUnits = null;
        result.infusionTime = null;
      }
      else {
        result.perWeightUnits = (divisor.weight === null ? null : quantityUnit[divisor.weight]);
        result.infusionTime = (divisor.time === null ? null : timeUnit[divisor.time]);
      }

      return result;
    }

unitDivisor
  = (weight:weightDivisor time:timeDivisor?) { return { "weight": weight, "time": time } }
  / time:timeDivisor { return { "weight": null, "time": time } }

timeDivisor
  = "/" unit:timeUnit { return unit; }

weightDivisor
  = "/" unit:quantityUnit { return unit; }

route
  = _ route:("IM" / "IV" / "PO" / "SC") { return route; }

interval
  = _ ("q" number:number selUnit:timeUnit) { return parseInt(number) * timeUnit[selUnit]; }
  /
  _ interval:("qd" / "od" / "bid" / "tid" / "qid" / "ac" / "daily") { return intervalUnit[interval]; }

timeUnit
  = "seconds" / "second" / "secs" / "sec" / "s" / "minutes" / "minute" / "mins" / "min" / "m" / "hours" / "hour" / "hrs" / "hr" / "h" / "days" / "day" / "d"

quantityUnit
  = "ng" / "mcg" / "mg" / "g" / "kg"

number "number"
  = integer ("." integer)? { return text(); }

integer
  = digits:[0-9]+ { return text(); }

_ "space"
  =[ \t\r\n]+

__ "space"
  =[ \t\r\n]*
