const style = require("./style.js");
const equality = require("./equality.js");

const redFg = style.redFg;
const greenFg = style.greenFg;
const yellowFg = style.yellowFg;
const printHeadline = style.printHeadline;

const areEqual = equality.areEqual;

const generateSuccessMessage = function(message) {
  return "✅ " + message;
}

const generateFailureMessage = function(expected, actual, message) {
  const expectedValue = greenFg("\n\tExpected : \t" + expected);
  const actualValue = redFg("\n\tActual   : \t" + actual);

  return "❌ " + message + expectedValue + actualValue;
}

let passedAssertions = 0;
const getPassedAssertions = function() {
  return passedAssertions;
}

let totalAssertions = 0;
const getTotalAssertions = function() {
  return totalAssertions;
}

const showTestResult = function(isTestPassed, expected, actual, testName) {
  const successMessage = generateSuccessMessage(testName); 
  const failureMessage = generateFailureMessage(expected, actual, testName); 
  const message = isTestPassed ? successMessage : failureMessage;
  const indentedMessage = "\t" + message;

  passedAssertions += isTestPassed;
  totalAssertions++;

  console.log(indentedMessage);
}

const assert = function(expected, actual, testName) {
  const isPassed = areEqual(actual, expected);
  showTestResult(isPassed, expected, actual, testName); 
}

const it = function(testName, testData) {
  const expected = testData.expected;
  const actual = testData.actual;

  assert(expected, actual, testName);
}

const generateSummaryMessage = function() {
  const passed = getPassedAssertions();
  const total = getTotalAssertions();
  const failed = total - passed;

  const colorOnFail = redFg(" test passed");
  const colorOnPass = greenFg(" test passed"); 
  const predicate = (failed > 0) ? colorOnFail : colorOnPass; 
  const score = passed + "/" + total;
  const summaryMessage = yellowFg("Summary : ") + score + predicate;

  return summaryMessage;
}

const showTestSummary = function() {
  let summaryMessage = generateSummaryMessage();
  summaryMessage = "\n" + summaryMessage.padStart(80) + "\n";

  console.log(summaryMessage);
}

exports.it = it;
exports.printHeadline = printHeadline; 
exports.showTestSummary = showTestSummary;

