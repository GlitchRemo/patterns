const style = function(text, code) {
  return "\033[" + code + "m" + text + "\033[0m";
}

const redFg = function(text) {
  return style(text, 31);
}

const greenFg = function(text) {
  return style(text, 32);
}

const yellowFg = function(text) {
  return style(text, 33);
}

const italics = function(text) {
  return style(text, 3);
}

const underline = function(text) {
  return style(text, 4);
}

const printHeadline = function(text) {
  console.log(yellowFg(italics(underline(text))));
}

exports.redFg = redFg;
exports.greenFg = greenFg;
exports.yellowFg = yellowFg;
exports.printHeadline = printHeadline;

