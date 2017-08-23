class Square {
  constructor (drawer, position, width, height, mass, maxSpeed, speed) {
    this.drawer = drawer;

    this.body = new Physics.Body(position, width, height, mass, maxSpeed, speed);
    drawer.world.addBody(this.body);
  }

  draw () {
    this.drawer.ctx.fillRect(
      this.body.position.x,
      this.body.position.y,
      this.body.width,
      this.body.height
    );
  }

  die () {
    this.drawer.world.removeBody(this.body);
  }
};
