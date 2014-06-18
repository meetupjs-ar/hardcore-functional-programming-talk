var curry = require('lodash-node/modern/functions/curry');
var compose = require('lodash-node/modern/functions/compose');
var find = require('lodash-node/modern/collections/find');
var flatMap = require('pointfree-fantasy').flatMap;

// A que posicion puedo llegar con un caballo desde una posicion
// en 3 movimientos en el ajedrez

function moveKnight(pos) {
  var x = pos[0], y = pos[1];
  return [
    [x+2,y-1],[x+2,y+1],[x-2,y-1],[x-2,y+1],
    [x+1,y-2],[x+1,y+2],[x-1,y-2],[x-1,y+2]
  ].filter(function(pos) {
    return pos[0] >=1 && pos[0] <= 8 && pos[1] >= 1 && pos[1] <= 8;
  });
}

var move3Times = compose(flatMap(moveKnight), flatMap(moveKnight), moveKnight);

var canReachIn3 = function(start, to) {
  return !!find(move3Times(start), function(pos) {
    return pos[0] == to[0] && pos[1] == to[1];
  });
}

console.log(canReachIn3([6, 2], [6, 1]));
console.log(canReachIn3([6, 2], [7, 3]));
console.log(canReachIn3([6, 2], [5, 6]));
console.log(canReachIn3([6, 2], [5, 5]));
