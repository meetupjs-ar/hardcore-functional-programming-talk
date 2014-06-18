var compose = require('lodash-node/modern/functions/compose');
var curry = require('lodash-node/modern/functions/curry');

var people = [
  {firstName: "John", lastName: "Doe"},
  {firstName: "Will", lastName: "Smith"},
  {firstName: "Brett", lastName: "Lawrence"},
  {firstName: "Hans", lastName: "Gonzalez"}
];

var tag = curry(function(tag, content) {
  return '<'+tag+'>' + content + '</'+tag+'>';
});

var map = curry(function(fn, arr) {
  return arr.map(function(item) { return fn(item);});
});

function renderList(people) {
  return tag('ul', people.map(function(person) {
    return tag('li', person.firstName + ', ' + person.lastName);
  }).join(''));
}

var join = curry(function(joinStr, arr) { return arr.join(joinStr) });
var getProps = curry(function(props, obj) { return props.map(function(prop) { return obj[prop]; }) });
var getFullName = compose(join(', '), getProps(['firstName', 'lastName']));
var renderItem = compose(tag('li'), getFullName);
var renderList = compose(tag('ul'), map(renderItem));

console.log(renderList(people));
