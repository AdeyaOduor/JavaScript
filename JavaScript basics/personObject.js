// Create person object
const Person = function(firstAndLast) {
  this._firstName = firstAndLast.split(' ')[0];
  this._lastName = firstAndLast.split(' ')[1];

  this.getFirstName = function() {
    return this._firstName;
  };

  this.getLastName = function() {
    return this._lastName;
  };

  this.getFullName = function() {
    return `${this._firstName} ${this._lastName}`;
  };

  this.setFirstName = function(first) {
    this._firstName = first;
    return this._firstName;
  };

  this.setLastName = function(last) {
    this._lastName = last;
    return this._lastName;
  };

  this.setFullName = function(firstAndLast) {
    this._firstName = firstAndLast.split(' ')[0];
    this._lastName = firstAndLast.split(' ')[1];
    return `${this._firstName} ${this._lastName}`;
  };
};

