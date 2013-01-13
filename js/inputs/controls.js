"use strict";
// This file will have the handler objects and functions for 
// keyboard & mouse events.

sf.controls = (function() {
    var cursorPos = {x: 0, y: 0, visible: false}
    var clicked = false;
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

    function keydown(keyevent) {
        keys[keyevent.which] = true;
    }
    function keyup(keyevent) {
        keys[keyevent.which] = false;
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


    function mouseclick(mouseEvent) {
        clicked = true;
    }
    
    function getClick() {
        if (clicked) {
            clicked = false;
            return true
        } else {
            return false;
        }
    }
    
    function mousemove(mouseEvent) {
        /*
        if (!sf.setup.canvasPosition) {
            var tempPos = sf.setup.context.getPosition();
            if (!tempPos) {
                console.log('No canvas context!');
                tempPos = {left: 0, top: 0}
            }
            sf.setup.canvasPosition = {
                x: tempPos.left,
                y: tempPos.top
            }
        }*/
        cursorPos.x = mouseEvent.offsetX;
        cursorPos.y = mouseEvent.offsetY;
        cursorPos.visible = true;
        // console.log(cursorPos.x, cursorPos.y, cursorPos.visible);
    }
    function mouseout() {
        cursorPos.visible = false;
    }
    function getCursorPos() {
        return cursorPos;
    }

    return {
        handlers: {
            keyup : keyup,
            keydown : keydown,
            mousemove : mousemove,
            mouseclick : mouseclick,
            mouseout: mouseout
        }, 
        getMovement: getMovement,
        getCursorPos: getCursorPos,
        getClick: getClick
    }
})();
