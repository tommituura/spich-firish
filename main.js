// Init function:

$(document).ready(function() {
  sf.setup.context = $('#screen')[0].getContext('2d');
  sf.setup.context.fillStyle = "rgb(200, 200, 200)";
  sf.setup.context.fillRect(10, 10, 300, 300);
});

