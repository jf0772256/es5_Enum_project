
function ES5Enum(options, enumValues){
  var enumVals,
    retEnumVals,
    defaults= {
      checkForChanges: false,
    },
    settings;

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
  var isObj1 = isObject(defaultOptions),  
    isObj2 = isObject(userSupplied);
  var keys = (isObj1) ? Object.keys(defaultOptions) : null, 
    uKeys = (isObj2) ? Object.keys(userSupplied) : null;
  ignoreExtraProperties = (ignoreExtraProperties === undefined || ignoreExtraProperties === null) ? false : ignoreExtraProperties;
  if (uKeys !== null && keys !== null) {
    for (var index = 0; index < keys.length; index++) {
      var e = keys[index];
      output[e] = defaultOptions[e];
    }
    for (var index = 0; index < uKeys.length; index++) {
      var e = uKeys[index];
      if (ignoreExtraProperties) {
        if (output.hasOwnProperty(e)) {
          output[e] = userSupplied[e];
        }
      } else {
        output[e] = userSupplied[e];
      }
    }
  } else {
    throw new Error('Type Error: One or both object parameters were not objects! We were unable to proceed with the operation.');
  }
}