
function ES5Enum(options, enumValues){
  var enumVals,
    retEnumVals,
    selectedValue,
    defaults = {
      allowChanges: false,
      onChangeThrowError: true
    },
    settings = {};
    objJoin(settings, defaults, options, true);
    selectedValue = 0;
    enumVals = arrayToObject(enumValues);
    retEnumVals = flipObj(enumVals);
    this.getValue = function(){
      return selectedValue;
    };
    this.getValueString = function(){
      return retEnumVals[selectedValue.toString()];
    };
    this.setValue = function(value){
      if (retEnumVals.hasOwnProperty(value.toString())) {
        selectedValue = value;
      } else {
        console.error('Value not found in Enum');
      }
    };
    this.EnumValueSelect = enumVals;
}

var isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};
var isObject = function(a) {
  return (!!a) && (a.constructor === Object);
};
var isNumber = function(a) {
  return (!!a) && (a.constructor === Number);
}

/**
 * Function to combine two objects into one. Takes 3 arguments to work, fourth is optional for controlled joins. 
 * As of yet doesnt support complex or deep checks not that it ever will.
 * Make sure not to just pass {} to the output, the output shoudl be set to a variable so that you can use it later.
 * @param {{}} output Required. This is the object that will be the result of the merged objects.
 * @param {{}} defaultOptions Required. This is the programmer supplied options and values object.
 * @param {{}} userSupplied Required. This is the object that the user supplies and the values that they chose.
 * @param {boolean} ignoreExtraProperties Optional. This flag defaults to false if not set. If true, will ignore properties within the user supplied options if they are not also existing in the programmer supplied options.
 */
var objJoin = function (output, defaultOptions, userSupplied, ignoreExtraProperties){
  var keys = (isObject(defaultOptions)) ? Object.keys(defaultOptions) : null, 
    uKeys = (isObject(userSupplied)) ? Object.keys(userSupplied) : null;
  ignoreExtraProperties = (ignoreExtraProperties === undefined || ignoreExtraProperties === null) ? false : ignoreExtraProperties;
  // only process if defaultOptions and userSupplied are objects with keys!
  if (uKeys !== null && keys !== null) {
    // populate the output object with defaultObjects values and keys
    for (var index = 0; index < keys.length; index++) {
      var e = keys[index];
      output[e] = defaultOptions[e];
    }
    // now implement userSupplied values to the output to override the default values
    for (var index = 0; index < uKeys.length; index++) {
      var e = uKeys[index];
      // if you set the argument4 value to true this is where that starts to happen
      if (ignoreExtraProperties) {
        if (output.hasOwnProperty(e)) {
          output[e] = userSupplied[e];
        }
      } else {
        // if not then you will have all values that the user put in... 
        output[e] = userSupplied[e];
      }
    }
  } else {
    // options types wee not objects!
    throw new Error('Type Error: One or both object parameters were not objects! We were unable to proceed with the operation.');
  }
}

/**
 * Function that takes an ordered array and converts it into a key=>value pair. and returns that.
 * @param {string[]} inputArray Values you want for your enum. Note though that you will need to have the default value be set at the first element. Convention follows that you use uppercase for the strings.
 * @returns {{}} Returns an object that can be set to a variable.
 */
var arrayToObject = function(inputArray){
  if (inputArray === undefined || !isArray(inputArray)) {
    throw new Error('Missing or invalid argument. Must be an array');
  } else if (inputArray.length == 0) {
    throw new Error('Cannot convert empty values into something... please provide the needed values and we will do the rest.');
  }
  var obj = {};
  for (var i = 0; i < inputArray.length; i++) {
    var e = inputArray[i];
    obj[e] = i;
  }
  return obj;
}

/**
 * Function that takes an object and returns the object with teh key=>value pairs swapped for eachother
 * @param {{}} inputObj Object that will be flipped.
 * @returns {{}} The new flipped object.
 */
var flipObj = function(inputObj){
  var ik = Object.keys(inputObj),
    iv = Object.values(inputObj),
    oo = {};
  for (var i = 0; i < ik.length; i++) {
    var e = ik[i],
      e1 = iv[i];
    oo[e1.toString()] = e;
  }
  return oo
}
