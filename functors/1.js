var curry = require('lodash-node/modern/functions/curry');

var map = curry(function(fn, obj) {
  return obj.map(fn);
});
var add = curry(function(a, b) {
  return a + b;
});

// Implementar Maybe

var Maybe = function(val) {
  if (!(this instanceof Maybe)) return new Maybe(val);

  this.val = val;
}

Maybe.prototype.map = function(f) {
  return this.val == null ? Maybe(null) : Maybe(f(this.val));
};

var listOfMaybes = [Maybe(2), Maybe(null), Maybe(4), Maybe(3)];

console.log(map(add(2), Maybe(2)));
console.log(map(add(2), Maybe(null)));
console.log(map(map(add(2)), listOfMaybes));
