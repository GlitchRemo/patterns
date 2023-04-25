const stars = function(width) {
  return '*'.repeat(width);
};

const spaces = function(width) {
  return ' '.repeat(width);
};

const hollowLines = function(width) {
  return stars(1) + spaces(width - 2) + stars(1);
};

const leftPaddedLine = function(lineWidth) {
  const maxWidth = 7;
  const pad = Math.ceil(maxWidth/2) - lineWidth;
  return spaces(pad) + stars(lineWidth);
};

const renderStyle = function(style, lineWidths) {
  return lineWidths.map(style);
};

const renderStyleGroup = function(styles, lineWidthGroups) {
  return lineWidthGroups.flatMap(function(lineWidth, index){
    return renderStyle(styles[index], lineWidth);
  });
};

const createTriangleDataSet = function(height) {
  const lineWidths = [];

  for(let lineWidth = 1; lineWidth <= height; lineWidth++) {
    lineWidths.push(lineWidth);
  }

  return lineWidths;
};

const groupForMonolith = function(lineWidths) {
  return [lineWidths];
}; 

const groupForBorder = function(lineWidths) {
  const lineWidthGroups = [];
  const length = lineWidths.length;

  lineWidthGroups.push([lineWidths[0]]);
  lineWidthGroups.push(lineWidths.slice(1, length - 1));
  lineWidthGroups.push([lineWidths[length - 1]]);

  return lineWidthGroups;
};

const createHollowTriangle = function(height) {
  const lineWidths = createTriangleDataSet(height);
  const lineWidthGroups = groupForBorder(lineWidths);
  const styles = [stars, hollowLines, stars];

  return renderStyleGroup(styles, lineWidthGroups);
};

const createFilledTriangle = function(height) {
  const lineWidths = createTriangleDataSet(height);
  const lineWidthGroups = groupForMonolith(lineWidths);
  const styles = [stars];

  return renderStyleGroup(styles, lineWidthGroups);
};

const createDiamondDataSet = function(maxWidth) {
  const lineWidths = [];

  for(let width = 1; width < maxWidth; width = width + 2) {
    lineWidths.push(width);
  };

  for(let width = maxWidth; width > 0; width = width - 2) {
    lineWidths.push(width);
  };

  return lineWidths;
};

const createFilledDiamond = function(maxWidth) {
  const lineWidths = createDiamondDataSet(maxWidth);
  const lineWidthGroups = groupForMonolith(lineWidths);
  const styles = [leftPaddedLine];

  return renderStyleGroup(styles, lineWidthGroups);
};

exports.createHollowTriangle = createHollowTriangle;
exports.createFilledTriangle = createFilledTriangle;
exports.createFilledDiamond = createFilledDiamond;
