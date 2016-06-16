var chai = require('chai');
var pharmajs = require('../index.js');

var assert = chai.assert;

describe('Prescription parsing', function() {
  it('should parse simple intermittent dosing', function() {
    var result = pharmajs.parseRx("Cefazolin 1g IV q24h");

    var expected = {
      medicationName: "cefazolin",
      route: "IV",
      dosing: {
        quantity: {
          scalar: 1,
          unit: 1},
        perWeightUnits: null,
        infusionTime: null
      },
      interval: 86400
    };

    assert.deepEqual(result, expected);
  });

  it('should parse decimal doses', function() {
    var result = pharmajs.parseRx("Doxycycline 0.5g PO qid");

    var expected = {
      medicationName: "doxycycline",
      route: "PO",
      dosing: {
        quantity: {
          scalar: 0.5,
          unit: 1},
        perWeightUnits: null,
        infusionTime: null
      },
      interval: 21600
    };

    assert.deepEqual(result, expected);
  });

  it('should parse hyphenated medications', function() {
    var result = pharmajs.parseRx("Piperacillin-Tazobactam 3.375g IV daily");

    var expected = {
      medicationName: "piperacillin-tazobactam",
      route: "IV",
      dosing: {
        quantity: {
          scalar: 3.375,
          unit: 1},
        perWeightUnits: null,
        infusionTime: null
      },
      interval: 86400
    };

    assert.deepEqual(result, expected);
  });

  it('should parse medications with spaces', function() {
    var result = pharmajs.parseRx("Septra DS 320mg PO bid");

    var expected = {
      medicationName: "septra ds",
      route: "PO",
      dosing: {
        quantity: {
          scalar: 320,
          unit: 0.001},
        perWeightUnits: null,
        infusionTime: null
      },
      interval: 43200
    };

    assert.deepEqual(result, expected);
  });

  it('should parse medications dosed by weight', function() {
    var result = pharmajs.parseRx("Amoxicillin-Clavulanate 22.5mg/kg PO bid");

    var expected = {
      medicationName: "amoxicillin-clavulanate",
      route: "PO",
      dosing: {
        quantity: {
          scalar: 22.5,
          unit: 0.001},
        perWeightUnits: 1000,
        infusionTime: null
      },
      interval: 43200
    };

    assert.deepEqual(result, expected);
  });

  it('should parse infusions dosed by time without a weight', function() {
    var result = pharmajs.parseRx("Propofol 5mg/hr IV");

    var expected = {
      medicationName: "propofol",
      route: "IV",
      dosing: {
        quantity: {
          scalar: 5,
          unit: 0.001},
        perWeightUnits: null,
        infusionTime: 3600
      },
      interval: null
    };

    assert.deepEqual(result, expected);
  });

  it('should parse infusions dosed by both weight and time', function() {
    var result = pharmajs.parseRx("Norepinephrine 0.2mcg/kg/min IV");

    var expected = {
      medicationName: "norepinephrine",
      route: "IV",
      dosing: {
        quantity: {
          scalar: 0.2,
          unit: 0.000001},
        perWeightUnits: 1000,
        infusionTime: 60
      },
      interval: null
    };

    assert.deepEqual(result, expected);
  });

});
