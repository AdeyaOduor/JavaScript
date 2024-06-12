let number = function(busStops){
  return busStops.map(x => x[0] - x[1]).reduce( (x, y) => x + y);
}

// method 2
var number = function(busStops){ //need a variable to hold the total number of ppl on the bus
     let totalCount = 0; //sample tests are arrays, need a loop to iterate through the array
     for (let i= 0; i < busStops.length; i++){    //1st number is ppl getting on   // 2nd number is ppl getting off
     let currentStop = busStops[i];
     let gettingOn = currentStop[0]; //first number in array (people getting on)
     let gettingOff = currentStop[1] //2nd number ppl (getting off)store the count of how many ppl got on and how many ppl got off
    
       totalCount += gettingOn;
       totalCount -= gettingOff;
       }
          answer
     return totalCount;
    }
/*

    let number = function(busStops) { ... }:
        This is a function expression that assigns an anonymous function to the variable number.
        The function takes a single parameter busStops, which is expected to be an array of arrays.

    return busStops.map(x => x[0] - x[1]):
        The map() method is used to iterate over the busStops array.
        For each element x in the busStops array, the code subtracts the second element (x[1]) from the first element (x[0]) and returns the result.
        This effectively calculates the difference between the number of people getting on and off the bus at each stop.

    .reduce((x, y) => x + y):
        The reduce() method is used to iterate over the array returned by the map() operation.
        The reduce() method takes an accumulator (x) and the current value (y) as parameters, and applies a function that adds the current value to the accumulator.
        This effectively sums up all the differences between the number of people getting on and off the bus at each stop.

So, the overall function number takes an array of bus stop data, where each element in the array is another array containing two numbers: the first number represents the number of people getting on the bus at that stop, and the second number represents the number of people getting off the bus at that stop.

The function then calculates the net change in the number of people on the bus at each stop by subtracting the number of people getting off from the number of people getting on. Finally, it sums up all these net changes and returns the result.

For example, if the busStops array is [[10, 0], [3, 5], [5, 8]], the function would return 5, because:

    At the first stop, 10 people got on and 0 people got off, so the net change is 10.
    At the second stop, 3 people got on and 5 people got off, so the net change is -2.
    At the third stop, 5 people got on and 8 people got off, so the net change is -3.
    The sum of these net changes is 10 - 2 - 3 = 5.
*/
