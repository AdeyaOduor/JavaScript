  /* Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first 
  word within the output should be capitalized only if the original word was capitalized. */ 

  function toCamelCase(str){
    var regExp=/[-_]\w/ig;
    return str.replace(regExp,function(match){
          return match.charAt(1).toUpperCase();
     });
}
