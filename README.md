# PharmaJS
A small library providing the ability to parse pharmaceutical prescriptions
into a JSON object that specifies the medication, dose, route, and dosing
interval or infusion parameters. The JSON object has the format:

````
{
  medicationName: [string],
  route: [string],
  dosing: {
    quantity: {
      scalar: [float], // Scalar amount of drug indicated
      unit: [float] // Multiplier for the drug units (e.g. 0.001 for mg)
    },
    perWeightUnits: [float], // Weight unit multiplier if the drug is dosed by weight
    infusionTime: [float] // Time in seconds over which the quantity of drug is infused
  },
  interval: [integer] // Seconds between doses
}
````

## Installation

````
npm install pharmajs --save
````

## Usage

````
var pharmajs = require('pharmajs');

var rx1 = 'Levophed 0.1 mcg/kg/min IV';
var rx2 = 'Cefazolin 1g IV q24h';

var rx1Parsed = pharmajs.parse(rx1);
var rx2Parsed = pharmajs.parse(rx2);
````

## Tests

````
gulp test
````

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
