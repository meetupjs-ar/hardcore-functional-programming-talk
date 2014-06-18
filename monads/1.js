var curry = require('lodash-node/modern/functions/curry');
var compose = require('lodash-node/modern/functions/compose');
var Maybe = require('pointfree-fantasy/instances/maybe');
var map = require('pointfree-fantasy').map;
var flatMap = require('pointfree-fantasy').flatMap;

// Maybe como null check:

function printUserAddress(user) {
  if (user) {
    if (user.address) {
      return user.address.number + ' ' + user.address.street;
    }
  }
}

var getProps = curry(function(props, obj) { return props.map(function(prop) { return obj[prop]; }) });
var get = curry(function(prop, obj) { return obj[prop]; });

var join = curry(function(joinStr, arr) { return arr.join(joinStr); });
var printAddress = compose(join(' '), getProps(['number', 'street']));
var tryGetAddress = compose(Maybe, get('address'));
var printUserAddress = compose(map(printAddress), flatMap(tryGetAddress), Maybe);

console.log(printUserAddress(null));
console.log(printUserAddress({}));
console.log(printUserAddress({address: {number: 123, street: 'Fake St.'}}));
