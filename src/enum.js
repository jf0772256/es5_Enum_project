
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

var objJoin = function (defaultOptions, userSupplied, ignoreExtraProperties){
  var isObj1 = isObject(defaultOptions),  
    isObj2 = isObject(userSupplied);
  var joined = {}, 
    keys = (isObj1) ? Object.keys(defaultOptions) : null, 
    uKeys = (isObj2) ? Object.keys(userSupplied) : null;
  ignoreExtraProperties = (ignoreExtraProperties === undefined || ignoreExtraProperties === null) ? false : ignoreExtraProperties;
  if (ukeys !== null && keys !== null) {
    for (var index = 0; index < keys.length; index++) {
      var e = keys[index];
      joined[e] = defaultOptions[e];
    }
    for (var index = 0; index < uKeys.length; index++) {
      var e = uKeys[index];
      if (ignoreExtraProperties) {
        if (joined.hasOwnProperty(e)) {
          joined[e] = userSupplied[e];
        }
      } else {
        joined[e] = userSupplied[e];
      }
    }
  } else {
    throw new Error('Type Error: One or both object parameters were not objects! We were unable to proceed with the operation.');
  }
}