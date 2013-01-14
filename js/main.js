"use strict";
// Init function:

$(document).ready(function() {
  sf.setup.context = $('#screen')[0].getContext('2d');
  test();
  console.log('Starting game....');
  $(document).keydown(function(event) {
    sf.controls.handlers.keydown(event);
  });
  $(document).keyup(function(eventInformation) {
    sf.controls.handlers.keyup(event);
  });
  $('#screen').mouseup(function(event) {
    sf.controls.handlers.mouseclick(event);
    //console.log(event.offsetX, event.offsetY);
  });
  $('#screen').mousemove(function(event) {
    sf.controls.handlers.mousemove(event);
  });
  $('#screen').mouseout(function(event) {
    sf.controls.handlers.mouseout();
  });
  sf.engine.state('GAME_SCREEN');
  sf.engine.tick();
});

