sf.objects.EnemyObject = function(posX, posY, movable) {
    this.init(posX, posY, movable, 10, 10);
    this.life = 1;
    this.hit = function(dmg) {
        if (typeof dmg === 'undefined') var dmg = 1;
        this.life = this.life - dmg;
    }
};
sf.objects.EnemyObject.prototype = sf.objects.GameObject;
