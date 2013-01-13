sf.objects.BulletObject = function(startX, startY, mouseX, mouseY, enemy, speed) {
    this.init(startX, startY, true, 5, 5);
    if (typeof speed === 'undefined') {
        this.speed = 10;
    } else {
        this.speed = speed;
    }
    /* TODO: pythagoras is not working right now. FIX! */
    this.moved = 0;
    var tempdX = mouseX - startX;
    var tempdY = mouseY - startY;
    var tempdH = Math.sqrt(Math.pow(tempdY,2) + Math.pow(tempdY,2)); // There might be some lookup magic available?
    var moveFraction = this.speed / tempdH;
    this.dX = (this.speed * tempdX) / tempdH;
    this.dY = (this.speed * tempdY) / tempdH;
    
    this.draw = function(context) {
        if (enemy) {
            context.fillStyle='rgb(255,0,0)';
        } else {
            context.fillStyle='rgb(0,255,0)';
        }
        context.fillRect(this.bounds.left, this.bounds.top, this.outerwidth, this.outerheight);
    }
    this.tick = function() { 
        this.moveBy(this.dX, this.dY);
        this.moved = this.moved + this.speed;
    }
}
sf.objects.BulletObject.prototype = sf.objects.GameObject;
