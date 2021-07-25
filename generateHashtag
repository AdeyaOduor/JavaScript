function generateHashtag (str) {
  if (str.length == 0 || str.length > 140) return false;
  return '#' + str.split(' ').filter(function(x){return x.length != 0;}).map(function(x){return x[0].toUpperCase() + x.slice(1);}).join('');
}
