const typeOf = function(element) {
  return Array.isArray(element) ? "array" : typeof element; 
}

const areOfSameSize = function(object1, object2) {
  return Object.keys(object1).length === Object.keys(object2).length;
}

const areArraysEqual = function(list1, list2) {
  if(list1 === list2) return true;

  if(!areOfSameSize(list1, list2)) return false;

  return list1.every(function(element, index) { 
    return areEqual(list1[index], list2[index]);
  });

  return true;
}

const areObjectsEqual = function(object1, object2) {
  if(object1 === object2) return true;

  if(!areOfSameSize(object1, object2)) return false;

  return Object.keys(object1).every(function(key) {
    return areEqual(object1[key], object2[key]);
  });
}

const areEqual = function(argument1, argument2) {
  if(typeOf(argument1) !== typeOf(argument2)) return false;

  if(typeOf(argument1) === "array") {
    return areArraysEqual(argument1, argument2);
  }

  if(typeOf(argument1) === "object") {
    return areObjectsEqual(argument1, argument2);
  }

  return argument1 === argument2;
}

exports.areEqual = areEqual;
