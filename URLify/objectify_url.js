function convertQueryToMap(query) {
  return query.split("&").reduce((map, params) => {
    var [props, value] = params.split("=");
    
    if (!value) return map;
    
    var props = props.split(".");
    var lastProp = props.pop();
    var deepestObject = props.reduce((obj, key) => {
      return obj[key] || (obj[key] = {});
    }, map);
    
    deepestObject[lastProp] = decodeURIComponent(value);
    
    return map;
  }, {});
}
