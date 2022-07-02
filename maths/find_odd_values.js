function findOdd(arr) {
    return arr.find((item, index) => arr.filter(el => el == item).length % 2)
  }

// method 2
function odds(values){
 
    return values.filter(values => values % 2 !== 0 );
    }
    odds([1, 2, 3, 4, 5, 6, 7, 8, 9]); 
