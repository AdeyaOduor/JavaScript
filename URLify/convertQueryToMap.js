function convertQueryToMap(query) {
  return query.split("&").reduce((map, params) => {
    var [props, value] = params.split("=");

    if (!value) return map;

    var propsArr = props.split(".");
    var lastProp = propsArr.pop();
    var deepestObject = propsArr.reduce((obj, key) => {
      if (!obj[key]) {
        obj[key] = {};
      }
      return obj[key];
    }, map);

    deepestObject[lastProp] = decodeURIComponent(value);

    return map;
  }, {});
}

var query = "user.name.firstname=John&user.name.lastname=Doe&user.age=30&language=JavaScript";
console.log(convertQueryToMap(query));
