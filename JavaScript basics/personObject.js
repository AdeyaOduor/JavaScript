// Create person object
const Person = function(firstAndLast) {
  

  let [firstName, lastName] = firstAndLast.split(' ');

  this.getFirstName = function() {
    return firstName;
  };

  this.getLastName = function() {
    return lastName;
  };

  this.getFullName = function() {
    return `${firstName} ${lastName}`;
  };

  this.setFirstName = function(first) {
    firstName = first;
    return firstName;
  };

  this.setLastName = function(last) {
    lastName = last;
    return lastName;
  }

  this.setFullName = function(firstAndLast) {
    firstName = firstAndLast.split(' ')[0];
    lastName = firstAndLast.split(' ')[1];
    return `${firstName} ${lastName}`;
  }

};

