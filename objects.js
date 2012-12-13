"use strict";
// This file holds the constructor functions for 
// gameplay/animation/etc. objects

sf.objects = {
    GameObject: {
        moveBy: function(x, y) {
            if (this.movable) {
                this.prevpos.x = this.pos.x;
                this.prevpos.y = this.pos.y;
                this.pos.x = this.pos.x + x;
                this.pos.y = this.pos.y + y;
                this.calculateBounds();
            }
        },
        calculateBounds: function() {
            this.bounds.top = this.pos.y - (this.outerheight/2);
            this.bounds.right = this.pos.x - (this.outerwidth/2);
            this.bounds.bottom = this.pos.y + (this.outerheight/2);
            this.bounds.left = this.pos.x + (this.outerwidth/2);
            this.prevbounds.top = this.prevpos.y - (this.outerheight/2);
            this.prevbounds.right = this.prevpos.x - (this.outerwidth/2);
            this.prevbounds.bottom = this.prevpos.y + (this.outerheight/2);
            this.prevbounds.left = this.prevpos.x + (this.outerwidth/2);
            // For some aggressive optimization of collision detection...
            this.movebounds.top = this.bounds.top < this.prevbounds.top ? this.bounds.top : this.prevbounds.top;
            this.movebounds.left = this.bounds.left < this.prevbounds.left ? this.bounds.left : this.prevbounds.left;
            this.movebounds.bottom = this.bounds.bottom > this.prevbounds.bottom ? this.bounds.bottom : this.prevbounds.bottom;
            this.movebounds.right = this.bounds.right > this.prevbounds.right ? this.bounds.right : this.prevbounds.right;
            
        },
        crudeCollision: function(that) { // This collision detection is for simple cases. Remember to run calculateBounds for both this and that!
        /*
            var thistop = this.bounds.top < this.prevbounds.top ? this.bounds.top : this.prevbounds.top;
            var thisleft = this.bounds.left < this.prevbounds.left ? this.bounds.left : this.prevbounds.left;
            var thisbottom = this.bounds.bottom > this.prevbounds.bottom ? this.bounds.bottom : this.prevbounds.bottom;
            var thisright = this.bounds.right > this.prevbounds.right ? this.bounds.right : this.prevbounds.right;
            
            var thattop = that.bounds.top < that.prevbounds.top ? that.bounds.top : that.prevbounds.top;
            var thatleft = that.bounds.left < that.prevbounds.left ? that.bounds.left : that.prevbounds.left;
            var thatbottom = that.bounds.bottom > that.prevbounds.bottom ? that.bounds.bottom : that.prevbounds.bottom;
            var thatright = that.bounds.right > that.prevbounds.right ? that.bounds.right : that.prevbounds.right;
          */  
            if (this.movebounds.right < that.movebounds.left && 
                that.movebounds.right < this.movebounds.left && 
                this.movebounds.top < that.movebounds.bottom && 
                that.movebounds.top < this.movebounds.bottom) {
                return true;
            }
            else {
                return false;
            }
        },
        hitboxCollision: function(that) { // this collision function is for more definite cases. Only run after getting true from crudeCollision!
            return true; // doesn't do anything really yet...
        },
        collision: function(that) {
            if (this.crudeCollision(that)) {
                return this.hitboxCollision(that);
            }
            else {
                return false;
            }
        },
        init: function(posX, posY, movable, outerwidth, outerheight) {
            this.pos = {x: posX, y: posY };
            this.prevpos = {x: posX, y: posY };
            this.movable = movable;
            this.outerwidth = outerwidth;
            this.outerheight= outerheight;
            this.bounds = {};
            this.prevbounds = {};
            this.movebounds = {};
            this.calculateBounds();
        },
        draw: function(context, color) {
            if (typeof color === 'undefined') {var color='rgb(0,0,0)';}
            if (!this.sprite) {
                context.fillStyle=color;
                context.fillRect(this.bounds.top, this.bounds.left, this.outerwidth, this.outerheight);
            }
        },
        shoutInfo: function() {
            console.log(this);
        }    
    },
    DummyObject: function(posX, posY, movable) {
        this.init(posX, posY, movable, 10, 10);
    },
    PlayerObject: function(posX, posY, movable) {
        this.init(posX, posY, movable, 10, 10);
        this.draw = function(context) {
            context.fillStyle='rgb(0,255,0)';
            context.fillRect(this.bounds.top, this.bounds.left, this.outerwidth, this.outerheight);
        }
    }
} 
sf.objects.DummyObject.prototype = sf.objects.GameObject;
sf.objects.PlayerObject.prototype = sf.objects.GameObject;
