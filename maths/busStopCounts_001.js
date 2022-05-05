let number = function(busStops){
  return busStops.map(x => x[0] - x[1]).reduce( (x, y) => x + y);
}

//var number = function(busStops){ //need a variable to hold the total number of ppl on the bus
  //  let totalCount = 0; //sample tests are arrays, need a loop to iterate through the array
    //for (let i= 0; i < busStops.length; i++){    //1st number is ppl getting on   // 2nd number is ppl getting off
      //let currentStop = busStops[i];
      //let gettingOn = currentStop[0]; //first number in array (people getting on)
      //let gettingOff = currentStop[1] //2nd number ppl (getting off)
      //   store the count of how many ppl got on and how many ppl got off
    
      //totalCount += gettingOn;
      //totalCount -= gettingOff;
      }
      // answer
     // return totalCount;
    }
