var compose = require('lodash-node/modern/functions/compose');
var curry = require('lodash-node/modern/functions/curry');
var map = require('pointfree-fantasy').map;
var Maybe = require('pointfree-fantasy/instances/maybe');
var Promise = require('fantasy-promises');

// Obtener el nombre del current user
function getCurrentUser() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(Maybe({name: 'John'}));
    }, 1000);
  });
}

// Traditional solution
function prog() {
  var user = getCurrentUser();

  if (user) {
    console.log("The user is here!: " + user.name);
  }
}

var log = console.log.bind(console);
var prepend = curry(function(prependStr, str) { return prependStr + str; });
var get = curry(function(prop, obj) { return obj[prop]; });
var printName = compose(log, prepend('The user is here!:'), get('name'));
var prog = compose(map(map(printName)), getCurrentUser);

var promise = prog();

// Run the promise
promise.extract();


// Si getCurrentUser pudiera devolver null?
// Si getCurrentUser fuera asincronico (de la db o de una api?)
// Si getCurrentUser fuera asincronico Y pudiera devolver null?



