let number = function(busStops){
  return busStops.map(x => x[0] - x[1]).reduce( (x, y) => x + y);
}
