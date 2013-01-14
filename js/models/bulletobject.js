sf.objects.BulletObject = function(startX, startY, mouseX, mouseY, enemy, speed) {
    this.init(startX, startY, true, 5, 5);
    if (typeof speed === 'undefined') {
        this.speed = 10;
    } else {
        this.speed = speed;
    }
    
    this.moved = 0;
    var tempdX = mouseX - startX;
    var tempdY = mouseY - startY;
    

    if (tempdX == 0 && tempdY == 0) { tempdX = 1; tempdY = 1;} // for stupid cases.

    var hypotenuse = Math.sqrt(tempdX*tempdX + tempdY*tempdY);

    if (tempdX < 0) {var xdir = -1;} else {var xdir = 1;}
    if (tempdY < 0) {var ydir = -1;} else {var ydir = 1;}
    
    var angle = Math.acos(tempdX/hypotenuse);
    this.dX = Math.cos(angle);
    this.dY = Math.sin(angle) * ydir;
    
    //console.log('starts:',startX, startY, 'mouse:', mouseX, mouseY, 'temps:', tempdX,tempdY); 
    //console.log('hypotenuse:', hypotenuse, 'angle:',angle, 'speed:',speed, 'dirs', xdir, ydir);
    
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
