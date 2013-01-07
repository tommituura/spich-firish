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
    var state = 'START_SCREEN';
    var draw = function () {
        if (state === 'GAME_SCREEN') {
            gameDraw();
        } else if (state === 'START_SCREEN') {
            startDraw();
        } else if (state === 'SCORE_SCREEN') {
            scoreDraw();
        } else if (state === 'SCOREINPUT_SCREEN') {
            scoreInputDraw();
        }
    }
    var gameDraw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, 800, 800);
        
        for (var i=0;i<sf.world.enemies.length; i++) {
            sf.world.enemies[i].draw(sf.setup.context, 'rgb(255,0,0)');
        }
        sf.world.player.draw(sf.setup.context)
        
    }
    var startDraw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, 800, 800);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Start screen!", 30, 30);
    }
    var scoreDraw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, 800, 800);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Score screen!", 30, 30);
    }
    var scoreInputDraw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, 800, 800);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Score Input screen!", 30, 30);
    }
    var tick = function() {
        sf.engine.draw();
        requestAnimFrame(sf.engine.tick);
    }
    var stateSwitch = function(switchto) {
        if (switchto === 'SCORE_SCREEN') {
            state = 'SCORE_SCREEN';
        } else if (switchto === 'SCOREINPUT_SCREEN') {
            state = 'SCOREINPUT_SCREEN';
        } else if (switchto === 'GAME_SCREEN') {
            state = 'GAME_SCREEN';
        } else {
            state = 'START_SCREEN';
        }
    }
    return {
        state: stateSwitch,
        draw: draw,
        tick: tick
    }
})();
