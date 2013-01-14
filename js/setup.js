"use strict";

sf.debug = function(message) { if (sf.devel && console) {console.log(message);}};

sf.setup = {
  width: 800,
  height: 800,
  context: null, // here only for information as "this is here"
  canvasPosition: null, // as is this one, too
  playerspeed: 4,
  levels: $.getJSON('data/levels.json', function(levelsdata) {
    sf.setup.levels = levelsdata;
  })
};

sf.objects = {};

