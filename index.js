module.exports = {
  parseRx: function(rx) {
    var rxParser = require("./pharmajs-parser.js");

    return rxParser.parse(rx);
  }
};
