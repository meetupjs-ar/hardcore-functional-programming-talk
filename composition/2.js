var compose = require('lodash-node/modern/functions/compose');
var curry = require('lodash-node/modern/functions/curry');
var size = require('lodash-node/modern/collections/size');
var contains = require('lodash-node/modern/collections/contains');

// Contar las vocales de una palabra

var filter = curry(function(f, arr) {
  return arr.filter(function(item) { return f(item); });
});

var split = curry(function(delim, str) { return str.split(delim); });

var contains = curry(contains, 2);
var isVowel = contains(['a', 'e', 'i', 'o', 'u']);

var vowelCount = compose(size, filter(isVowel), split(''));

console.log(vowelCount("hola mundo!!"));
console.log(vowelCount("una oracion"));
