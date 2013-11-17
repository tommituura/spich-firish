"use strict";

var sf = {};

sf.debug = function() { if (sf.devel && console) {console.log(arguments);}};

sf.setup = {
  width: 800,
  height: 800,
  context: null, // here only for information as "this is here"
  canvasPosition: null, // as is this one, too
  playerspeed: 10,
  scoreApiUrl: 'http://ttuura.users.cs.helsinki.fi/api/sfscore/',
  levelsFile: 'data/levels.json',
  readyToRun: false // this should be set to true by sf.levels module when level info has been fetched and parsed.
};

sf.objects = {};

