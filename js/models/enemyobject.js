sf.objects.EnemyObject = function(posX, posY, movable) {
    this.init(posX, posY, movable, 10, 10);
};
sf.objects.EnemyObject.prototype = sf.objects.GameObject;
