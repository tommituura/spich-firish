sf.objects.DummyObject = function(posX, posY, movable) {
    this.init(posX, posY, movable, 10, 10);
};
sf.objects.DummyObject.prototype = sf.objects.GameObject;
