"use strict";

var sf = {};

sf.setup = {
  width: 800,
  height: 800,
  context: null, // here only for information as "this is here"
  canvasPosition: null, // as is this one, too
  levels: $.getJSON('data/levels.json')
};

sf.objects = {};

