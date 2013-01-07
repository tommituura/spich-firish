"use strict";
// Init function:

$(document).ready(function() {
  sf.setup.context = $('#screen')[0].getContext('2d');
  test();
  console.log('Starting game....');
  sf.engine.tick();
});

