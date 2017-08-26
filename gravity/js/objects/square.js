class Square {
  constructor (world, position, width, height, mass, maxSpeed, speed) {
    this.world = world;

    this.body = new Physics.Body(position, width, height, mass, maxSpeed, speed);
    this.world.addBody(this.body);
  }

  die () {
    this.world.removeBody(this.body);
  }
};
