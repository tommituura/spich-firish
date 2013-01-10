"use strict";
// Init function:

$(document).ready(function() {
  sf.setup.context = $('#screen')[0].getContext('2d');
  test();
  console.log('Starting game....');
  $(document).keydown(function(eventInformation) {
    sf.controls.handlers.keydown(eventInformation);
  });
  $(document).keyup(function(eventInformation) {
    sf.controls.handlers.keyup(eventInformation);
  });
  sf.engine.tick();
});

