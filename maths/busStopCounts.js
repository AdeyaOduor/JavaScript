let number = function(busStops){
  return busStops.map(x => x[0] - x[1]).reduce( (x, y) => x + y);
}
--------------------------------------------------------------------------------------------------------
// Assuming you have an API that returns the number of passengers getting on and off at each bus stop
function getBusStopData(routeId) {
  // Make an API call to fetch the bus stop data for the given route
  return fetch(`/api/bus-stops?route=${routeId}`)
    .then(response => response.json())
    .then(data => data.map(stop => [stop.boardingCount, stop.alightingCount]));
}

function number(busStops) {
  return busStops.map(x => x[0] - x[1]).reduce((x, y) => x + y);
}

// Example usage
const routeId = 'route123';
getBusStopData(routeId)
  .then(busStopData => {
    const netPassengerChange = number(busStopData);
    console.log(`Net change in passengers for route ${routeId}: ${netPassengerChange}`);

  })
  .catch(error => {
    console.error('Error fetching bus stop data:', error);
  });
  /*
  The number function can be used to calculate the net change in the number of passengers at each bus stop, which can be 
  useful for various purposes, such as:

    Optimizing Bus Schedules: By analyzing the net change in passengers at each stop, the transportation authorities can identify the busiest 
    stops and adjust bus schedules accordingly to better accommodate passenger demand. This can help improve the efficiency of the bus network 
    and reduce overcrowding.

    Predicting Passenger Load: The net change in passengers at each stop can be used to predict the expected passenger load on the bus as it travels along the route. This information can be displayed to users, allowing them to make informed decisions about their travel plans, such as choosing a less crowded bus or arriving at a stop earlier to get a seat.

    Capacity Planning: The data collected from the number function can be used to plan the required bus capacity for different routes and times of the day. Transportation planners can use this information to determine the appropriate number and size of buses to deploy, ensuring that there is sufficient capacity to meet passenger demand.

    Passenger Flow Analysis: By analyzing the net change in passengers at each stop, transportation authorities can gain insights into passenger flow patterns within the bus network. This can help them identify bottlenecks, plan for infrastructure improvements, and make more informed decisions about resource allocation.
*/
---------------------------------------------------------------------------------------------------------------------------------------
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
