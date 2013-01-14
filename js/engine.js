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

sf.engine = {}; 

sf.engine.startScreen = (function() {
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Start screen!", 30, 30);
    };
    var tick = function() {
    };
    return {
        draw: draw, 
        tick: tick
    }
})();

sf.engine.hiScore = (function() {
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Score screen!", 30, 30);
    };
    var tick = function() {
    };
    return {
        draw: draw, 
        tick: tick
    }
})();

sf.engine.hiScoreInput = (function() {
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Score Input screen!", 30, 30);
    };
    var tick = function() {
    };
    return {
        draw: draw, 
        tick: tick
    }
})();

sf.engine.game = (function() {
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        for (var i=0;i<sf.world.terrain.length; i++) {
            sf.world.terrain[i].draw(sf.setup.context, 'rgb(10,10,10)');
        }
        
        for (var i=0;i<sf.world.enemies.length; i++) {
            sf.world.enemies[i].draw(sf.setup.context, 'rgb(255,0,0)');
        }
        for (var i=0; i<sf.world.enemybullets.length; i++) {
            sf.world.enemybullets[i].draw(sf.setup.context);
        }
        for (var i=0; i<sf.world.playerbullets.length; i++) {
            sf.world.playerbullets[i].draw(sf.setup.context);
        }
        sf.world.player.draw(sf.setup.context);
    };
    
    var tick = function() {
        var playermove = sf.controls.getMovement();
        var crosshairs = sf.controls.getCursorPos();
        var shoot = sf.controls.getClick();

        if (shoot) {
            var clickPos = sf.controls.getClickPos();
            sf.world.playerbullets.push(new sf.objects.BulletObject(sf.world.player.pos.x, sf.world.player.pos.y, clickPos.x, clickPos.y,false,10));
        }
        
        for (var i=0; i<sf.world.enemybullets.length; i++) {
            sf.world.enemybullets[i].tick();
        }
        for (var i=0; i<sf.world.playerbullets.length; i++) {
            sf.world.playerbullets[i].tick();
        }
        sf.world.player.moveBy(playermove[0]*sf.setup.playerspeed, playermove[1]*sf.setup.playerspeed);
    };
    
    return {
        draw: draw, 
        tick: tick
    }
})();

sf.engine.main = (function() {
    var state = 'START_SCREEN';
    var currentMode = sf.engine.startScreen;

    var tick = function() {
        currentMode.tick();
        currentMode.draw();
        requestAnimFrame(sf.engine.main.tick);
    }
    var stateSwitch = function(switchto) {
        if (switchto === 'SCORE_SCREEN') {
            state = 'SCORE_SCREEN';
            currentMode = sf.engine.hiScore;
        } else if (switchto === 'SCOREINPUT_SCREEN') {
            state = 'SCOREINPUT_SCREEN';
            currentMode = sf.engine.hiScoreInput;
        } else if (switchto === 'GAME_SCREEN') {
            state = 'GAME_SCREEN';
            currentMode = sf.engine.game;
        } else {
            state = 'START_SCREEN';
            currentMode = sf.engine.startScreen;
        }
    }
    return {
        state: stateSwitch,
        tick: tick
    }
})();
