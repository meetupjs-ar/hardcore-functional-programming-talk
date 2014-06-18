var compose = require('lodash-node/modern/functions/compose');
var curry = require('lodash-node/modern/functions/curry');
var first = require('lodash-node/modern/arrays/first');

var filter = curry(function(f, arr) {
  return arr.filter(function(item) { return f(item); });
});

// Buscar el primer usuario que tengan menos de 21 años

var users = [
  {name: "Alfred", age: 26},
  {name: "Bob", age: 18},
  {name: "Carol", age: 24},
  {name: "Dennis", age: 16},
  {name: "Edward", age: 27}
];

var firstYoung = function(users) {
  return first(users.filter(function(user) {
    return user.age < 21;
  }));
};

var lessThan = curry(function(what, number) { return number < what; });
var get = curry(function(prop, obj) { return obj[prop]; });
var isYoung = compose(lessThan(21), get('age'));
var firstYoung = compose(first, filter(isYoung));

console.log(firstYoung(users));
