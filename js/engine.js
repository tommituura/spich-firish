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
    var waitingFrameCounter = 0;
    var waitText = function() {
        var counterRound = waitingFrameCounter % 120;
        if (counterRound < 10)       {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 20)  {return '  *fetching & parsing data ... please wait*  ';}
        else if (counterRound < 30)  {return ' * fetching & parsing data ... please wait * ';}
        else if (counterRound < 40)  {return '*  fetching & parsing data ... please wait  *';}
        else if (counterRound < 50)  {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 60)  {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 70)  {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 80)  {return '*  fetching & parsing data ... please wait  *';}
        else if (counterRound < 90)  {return ' * fetching & parsing data ... please wait * ';}
        else if (counterRound < 100) {return '  *fetching & parsing data ... please wait*  ';}
        else if (counterRound < 110) {return '   fetching & parsing data ... please wait   ';}
        else                         {return '   fetching & parsing data ... please wait   ';}
    }
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '40px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("SPICH-FIRISH", 140, 140);
        
        sf.setup.context.font = '15px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillText("WASD to move.", 150, 200);
        sf.setup.context.fillText("Aim and shoot with mouse.", 150, 220);
        sf.setup.context.fillText("You are Black. Avoid/shoot Red. Reach Green.", 150, 240);
        sf.setup.context.fillText("Your time is your score.", 150, 260);
        
        if (sf.setup.readyToRun) {
            sf.setup.context.fillText("Press any key to start.", 150, 300);
        } else {
            sf.setup.context.font = '15px Courier';
            sf.setup.context.fillText(waitText(), 150, 300);
        }
    };
    var tick = function() {
        waitingFrameCounter = waitingFrameCounter + 1;
        if (sf.setup.readyToRun && sf.controls.getAnyKey()) {
            sf.controls.getClick(); // empty the mouseclick buffer.
            sf.engine.main.state('GAME_SCREEN');
        }
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

/* THIS MODULE is the heart of game logic. */
sf.engine.game = (function() {
    var currentLevel = null;
    var maxLevelIndex = null;
    var player = null;
    var goal = null;
   
    var enemies = [];
    var enemybullets = [];
    var playerbullets = [];
    var terrain = [];
    
    var time = {start: null, now: null, killBonus: 0};
    
    var initLevel = function(level) {
        sf.debug('Starting new level...', currentLevel, maxLevelIndex);
        var levelData = sf.levels.getLevel(level);
        terrain = [];
        enemies = [];
        player = null;
        player = null;
        
        playerbullets = [];
        enemybullets = [];
        
        for (var i=0;i<levelData.terrain.length;i++) {
            terrain.push(new sf.objects.TerrainObject(levelData.terrain[i].x, levelData.terrain[i].y, levelData.terrain[i].width, levelData.terrain[i].height));
        }
        for (var i=0;i<levelData.enemies.length;i++) {
            enemies.push(new sf.objects.EnemyObject(levelData.enemies[i].x, levelData.enemies[i].y, true));
        }
        player = new sf.objects.PlayerObject(levelData.player.x, levelData.player.y, true);
        goal = new sf.objects.GoalObject(levelData.goal.x, levelData.goal.y, false);
    }
    
    var nextLevel = function() {
        if (currentLevel < maxLevelIndex) {
            currentLevel = currentLevel + 1;
            initLevel(currentLevel);
        } else {
            sf.debug('A WINRAR IS YOU');
        }
    };
    
    var init = function() {
        currentLevel = 0;
        maxLevelIndex = sf.levels.levelCount() - 1;

        initLevel(0);
        time.start = new Date().valueOf();
        time.now = new Date().valueOf();
    };
    
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        for (var i=0;i<terrain.length; i++) {
            terrain[i].draw(sf.setup.context);
        }
        
        for (var i=0;i<enemies.length; i++) {
            enemies[i].draw(sf.setup.context, 'rgb(255,0,0)');
        }
        for (var i=0; i<enemybullets.length; i++) {
            enemybullets[i].draw(sf.setup.context);
        }
        for (var i=0; i<playerbullets.length; i++) {
            playerbullets[i].draw(sf.setup.context);
        }
        goal.draw(sf.setup.context);
        player.draw(sf.setup.context);
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillText((time.now-time.start) + ' ... ' + time.killBonus ,0,800);
    };
    
    var tick = function() {
        var playermove = sf.controls.getMovement();
        var crosshairs = sf.controls.getCursorPos();
        var shoot = sf.controls.getClick();
        var killedEnemies = 0;

        if (shoot) {
            var clickPos = sf.controls.getClickPos();
            playerbullets.push(new sf.objects.BulletObject(player.pos.x, player.pos.y, clickPos.x, clickPos.y,false,5));
        }
        
        for (var i=0; i<enemybullets.length; i++) {
            enemybullets[i].tick();
        }
        var survivedBullets = [];
        var survivedEnemies = [];
        for (var i=0; i<playerbullets.length; i++) {
            var terrainHit = false;
            var enemyHit = false;
            playerbullets[i].tick();
            
            for (var j=0; j<terrain.length;j++) {
                if (playerbullets[i].collision(terrain[j])) {
                    terrainHit = true;
                }
            }
            for (var k=0; k<enemies.length; k++) {
                if (playerbullets[i].collision(enemies[k])) {
                    enemies[k].hit();
                    enemyHit = true;
                }
            }
            if (!terrainHit && !enemyHit) {
                survivedBullets.push(playerbullets[i]);
            }
        }
        for (var h=0; h<enemies.length; h++) {
            if (enemies[h].life > 0) {
                survivedEnemies.push(enemies[h]);
            }
        }
        playerbullets = survivedBullets;
        killedEnemies = killedEnemies + (enemies.length - survivedEnemies.length);
        enemies = survivedEnemies;

        player.moveBy(playermove[0]*sf.setup.playerspeed, playermove[1]*sf.setup.playerspeed);
        var playerHitWall = false;
        for (var i=0;i<terrain.length;i++) {
            if (player.collision(terrain[i])) {
                playerHitWall = true;
            }
        }
        
        if (playerHitWall) {
            player.moveBy(-1*playermove[0]*sf.setup.playerspeed, -1*playermove[1]*sf.setup.playerspeed);
        }
        
        time.now = new Date().valueOf();
        time.killBonus = time.killBonus + killedEnemies;
        killedEnemies = 0;
        
        if (player.collision(goal)) {
            nextLevel();
        }
    };
    return {
        init: init,
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
            sf.engine.game.init();
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
