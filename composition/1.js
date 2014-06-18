var compose = require('lodash-node/modern/functions/compose');
var first = require('lodash-node/modern/arrays/first');
var reverse = function(arr) { return arr.reverse(); }

// Reescribir last con composicion

var last = function(arr) {
  return first(reverse(arr));
}

var last = compose(first, reverse);

console.log(last([1, 2, 3, 4]));
console.log(last([5, 4, 2, 7, 4, 8]));
