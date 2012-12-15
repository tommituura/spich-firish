"use strict";
// This file will have the handler objects and functions for 
// keyboard & mouse events.

sf.controls = (function() {
    var cursorPos = {x: 0, y: 0}
    var keys = [];
    for (var i=0; i<256; i++) {
        keys[i] = false;
    }

    function up () {
        return keys[38] || keys[175] || keys[87];
    }
    
    function down() {
        return keys[40] || keys[176] || keys[83];
    }

    function left() {
        return keys[37] || keys[178] || keys[65];
    }

    function right() {
        return keys[39] || keys[177] || keys[68];
    }

    function keydown(keycode) {
        keys[keycode] = true;
    }
    function keyup(keycode) {
        keys[keycode] = false;
    }
    function getMovement() {
        var movement = [0, 0];
        if(up()) {
            movement[1] = -1;
        }
        if(down()) {
            movement[1] = 1;
        }
        if(left()) {
            movement[0] = -1;
        }
        if(right()) {
            movement[0] = 1;
        }
        
        return movement;
    }

    function mousemove(mouseEvent) {
        if (!sf.setup.canvasPosition) {
            var tempPos = sf.setup.context.getPosition()
            if (!tempPos) {
                console.log('No canvas context!');
                tempPos = {left: 0, top: 0}
            }
            sf.setup.canvasPosition = {
                x: tempPos.left,
                y: tempPos.top
            }
        }
        cursorPos.x = mouseEvent.pageX - sf.setup.canvasPosition.x;
        cursorPos.y = mouseEvent.pageY - sf.setup.canvasPosition.x;
    }

    function getCursorPos() {
        return cursorPos;
    }

    return {
        handlers: {
            keyup : keyup,
            keydown : keydown,
            mousemove : mousemove
        }, 
        getMovement: getMovement,
        getCursorPos: getCursorPos
    }
})();
