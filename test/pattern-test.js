const testing = require("../lib/testing.js");
const pattern = require("../src/pattern.js");

const it = testing.it;
const printHeadline = testing.printHeadline;
const showTestSummary = testing.showTestSummary;

const createHollowTriangle = pattern.createHollowTriangle;
const createFilledTriangle = pattern.createFilledTriangle;
const createFilledDiamond = pattern.createFilledDiamond;

const runTests = function(){
  printHeadline('Testing test framework');

  it( 'Should render a filled triangle.', {
    expected: [ '*', '**', '***', '****' ],
    actual: createFilledTriangle(4)
  });

  it( 'Should render a hollow triangle.', {
    expected: [ '*', '**', '* *', '****' ],
    actual: createHollowTriangle(4)
  });

  /*
  it( 'Should render a filled diamond.', {
    expected: [ '   *', '  ***', '*****', '  ***', '   *' ],
    actual: createFilledDiamond(5)
  });
   */
};

runTests();
showTestSummary();
