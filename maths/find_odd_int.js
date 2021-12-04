function findOdd(arr) {
    return arr.find((item, index) => arr.filter(el => el == item).length % 2)
  }