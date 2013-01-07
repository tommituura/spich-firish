"use strict";

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

sf.engine = (function() {
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, 800, 800);
        
        for (var i=0;i<sf.world.enemies.length; i++) {
            sf.world.enemies[i].draw(sf.setup.context, 'rgb(255,0,0)');
        }
        sf.world.player.draw(sf.setup.context)
        
    }
    var tick = function() {
        sf.engine.draw();
        requestAnimFrame(sf.engine.tick);
    }
    return {
        draw: draw,
        tick: tick
    }
})();
