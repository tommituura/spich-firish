"use strict";
// Init function:

$(document).ready(function() {
  sf.setup.context = $('#screen')[0].getContext('2d');
  sf.debug('Starting game....');
  $(document).keydown(function(event) {
    sf.controls.handlers.keydown(event);
  });
  $(document).keyup(function(eventInformation) {
    sf.controls.handlers.keyup(event);
  });
  $('#screen').mousedown(function(event) {
    sf.controls.handlers.mouseclick(event);
  });
  $('#screen').mousemove(function(event) {
    sf.controls.handlers.mousemove(event);
  });
  $('#screen').mouseout(function(event) {
    sf.controls.handlers.mouseout();
  });
  sf.scores.syncServer();
  sf.levels.initWorld(sf.setup.levelsFile);
  sf.engine.main.state('START_SCREEN');
  sf.engine.main.tick();
});

