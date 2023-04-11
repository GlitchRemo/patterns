function style(text, code) {
  return "\033[" + code + "m" + text + "\033[0m";
}

function redFg(text) {
  return style(text, 31);
}

function greenFg(text) {
  return style(text, 32);
}

function yellowFg(text) {
  return style(text, 33);
}

function italics(text) {
  return style(text, 3);
}

function underline(text) {
  return style(text, 4);
}

function printHeadline(text) {
  console.log(yellowFg(italics(underline(text))));
}

function isApproximatelySame(expected, actual, precision) {
  if(expected === actual) {
    return true;
  }

  return actual >= (expected - precision) && actual <= (expected + precision) ;
}

function isEqual(list1, list2) {
  if (list1.length === 0 && list2.length === 0) return true;

  if (list1.length !== list2.length) return false;

  if (list1[0] !== list2[0]) return false;

  return isEqual(list1.slice(1), list2.slice(1)); 
}

function generateSuccessMessage(message) {
  return "✅ " + message;
}

function generateFailureMessage(expected, actual, message) {
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

function showTestResult(isTestPassed, expected, actual, testName) {
  const successMessage = generateSuccessMessage(testName); 
  const failureMessage = generateFailureMessage(expected, actual, testName); 
  const message = isTestPassed ? successMessage : failureMessage;

  passedAssertions += isTestPassed;
  totalAssertions++;

  console.log(message);
}

const showTestSummary = function() {
  const passedAssertions = getPassedAssertions();
  const totalAssertions = getTotalAssertions();
  console.log("Summary : ", passedAssertions, "/", totalAssertions, "passed");
}

function assert(expected, actual, testName) {
  showTestResult(isApproximatelySame(actual, expected, 0.01), expected, actual, testName); 
}

function assertArrayEqual(expected, actual, testName) {
  showTestResult(isEqual(actual, expected), expected, actual, testName);
}



const star = "*";
const space = " ";

const repeatSymbol = function(symbol, length) {
  return symbol.repeat(length);
}

const repeatStars = function(length) {
  return repeatSymbol("*", length);
}

const repeatSpaces = function(length) {
  return repeatSymbol(" ", length);
}

const join = function(list, seperator) {
  let string = "";
  for(let item of list) {
    string += item + seperator;
  }
  return string.slice(0,-1);
}

const filledGrid = function(length, width) {
  let lines = [];
  for(let row = 0; row < width; row++) {
    const line = repeatStars(length);
    lines.push(line);
  }
  return lines;
}

const filledRectangle = function(length, width) {
  return join(filledGrid(length, width), "\n");
}

const hollowRectangle = function(length, width) {
  const rows = filledGrid(length, width);
  for(let index = 1; index < rows.length - 1; index++) {
    rows[index] = star + space.repeat(rows[index].length-2) + star;
  }
  return join(rows,"\n");
}

const alternateRectangle = function(length, width) {
  let lines = [];
  const symbol = "*-";
  for(let row = 0; row < width; row++) {
    const line = repeatSymbol(symbol[row % 2], length);
    lines.push(line);
  }
  return join(lines,"\n");
}

const repeatedRectangle = function(length, width, repeat) {
  let lines = [];
  for(let row = 0; row < width; row++) {
    let line = [];
    for(let tern = 0; tern < repeat; tern++) {
      const partOfLine = repeatStars(length);
      line.push(partOfLine);
    }
    line = join(line, " ");
    lines.push(line);
  }
  return join(lines, "\n");
}

const leftAlignedTriangle = function(width) {
  let lines = [];
  for(let row = 1; row <= width; row++) {
    const line = repeatStars(row);
    lines.push(line);
  }
  return join(lines,"\n");
}

const rightAlignedTriangle = function(width) {
  let lines = [];
  for(let row = 1; row <= width; row++) {
    let line = repeatSpaces(width - row);
    line += repeatStars(row);
    lines.push(line);
  }
  return join(lines,"\n");
}

const filledDiamond = function(width) {
  const upperPart = [];

  for(let count = 1; count <= width; count+=2) {
    let line = repeatSpaces((width - count) / 2);
    line += repeatStars(count);
    upperPart.push(line);
  }

  const lowerPart = upperPart.slice(0,-1).reverse();
  return join(upperPart.concat(lowerPart),"\n");
}


const testFilledRectangle = function() {
  printHeadline("filledRectangle()");
  assert("", filledRectangle(0,0), "length and width are both 0");
  assert("**\n**", filledRectangle(2,2), "print a 2x2 square");
  assert("**\n**\n**", filledRectangle(2,3), "print a 2x3 rectangle");
  assert("*****\n*****\n*****", filledRectangle(5,3), "print a 5x3 rectangle");
}

const testHollowRectangle = function() {
  printHeadline("hollowRectangle()");
  assert("", hollowRectangle(0,0), "length and width are both 0");
  assert("**\n**", hollowRectangle(2,2), "print a 2x2 square");
  assert("**\n**\n**", hollowRectangle(2,3), "print a filled 2x3 rectangle");
  assert("*****\n*   *\n*****", hollowRectangle(5,3), "print a hollow 5x3 rectangle");
}

const testAlternateRectangle = function() {
  printHeadline("alternateRectangle()");
  assert("", alternateRectangle(0,0), "length and width are both 0");
  assert("**\n--", alternateRectangle(2,2), "print a square");
  assert("**\n--\n**\n--", alternateRectangle(2,4), "even number of lines");
  assert("*****\n-----\n*****", alternateRectangle(5,3), "odd number of lines");
}

const testRepeatedRectangle = function() {
  printHeadline("repeatedRectangle()");
  assert("", repeatedRectangle(0,0,2), "length and width are both 0");
  assert("", repeatedRectangle(2,3,0), "repeated 0");
  assert("** ** **\n** ** **", repeatedRectangle(2,2,3), "print a square repeated thrice");
  assert("**\n**\n**\n**", repeatedRectangle(2,4,1), "even number of lines repeated once");
  assert("*****\n*****\n*****", repeatedRectangle(5,3,1), "odd number of lines");
}

const testLeftAlignedTriangle = function() {
  printHeadline("leftAlignedTriangle()");
  assert("", leftAlignedTriangle(0), "0 line");
  assert("*", leftAlignedTriangle(1), "1 line");
  assert("*\n**\n***\n****", leftAlignedTriangle(4), "4 lines");
}

const testRightAlignedTriangle = function() {
  printHeadline("rightAlignedTriangle()");
  assert("", rightAlignedTriangle(0), "0 line");
  assert("*", rightAlignedTriangle(1), "1 line");
  assert("   *\n  **\n ***\n****", rightAlignedTriangle(4), "4 lines");
}

const testFilledDiamond = function() {
  printHeadline("filledDiamond()");
  assert("", filledDiamond(0), "width of 0");
  assert("*", filledDiamond(1), "width of 1");
  assert("  *\n ***\n*****\n ***\n  *", filledDiamond(5), "width of 5");
  assert("   *\n  ***\n *****\n*******\n *****\n  ***\n   *", filledDiamond(7), "width of 7");
}

const runTests = function() {
  testFilledRectangle();
  testHollowRectangle();
  testAlternateRectangle();
  testRepeatedRectangle();
  testLeftAlignedTriangle();
  testRightAlignedTriangle();
  testFilledDiamond();
}

runTests();
showTestSummary();
