// Simple testing code...
function test() {
    sf.setup.context.fillStyle = "rgb(200, 200, 200)";
    sf.setup.context.fillRect(10, 10, 780, 780);

    sf.world = {};
    sf.world.enemies = [];
    
    sf.world.enemies.push(new sf.objects.DummyObject(6, 6, true));
    sf.world.enemies.push(new sf.objects.DummyObject(9, 9, true));
    sf.world.enemies[0].moveBy(1, 1);
    console.log(sf.world.enemies[0].collision(sf.world.enemies[1]));
    
    sf.world.player = new sf.objects.PlayerObject(26, 26, true);
    sf.world.player.draw(sf.setup.context);
}
