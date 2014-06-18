var fs = require('fs');
var Promise = require('fantasy-promises');
var compileCoffee = require('coffee-script').compile;
var uglifyJS = require('uglify-js');
var curry = require('lodash-node/modern/functions/curry');
var compose = require('lodash-node/modern/functions/compose');
var map = require('pointfree-fantasy').map;
var flatMap = require('pointfree-fantasy').flatMap;

var log = function(what) { console.log(what); };

// readFile :: String -> Promise(String)
function readFile(path) {
  return new Promise(function(resolve) {
    fs.readFile(path, 'utf8', function(err, contents) {
      resolve(contents);
    });
  });
}

// fromCoffee :: String -> Promise(String)
function fromCoffee(code) {
  return new Promise(function(resolve) {
    resolve(compileCoffee(code));
  });
}

// uglify :: String -> String
function uglify(code) {
  ast = uglifyJS.parse(code);
  ast.figure_out_scope();
  compressor = uglifyJS.Compressor();
  ast = ast.transform(compressor);
  return ast.print_to_string();
}

// Compile and minify foo.coffee and log the output
var compile = compose(map(uglify), flatMap(fromCoffee), readFile);

var prog = compose(map(log), compile);
var promise = prog(__dirname + '/foo.coffee');

// Run promise
promise.extract();
