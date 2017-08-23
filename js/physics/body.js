Physics.Body = class {
  constructor (position, width, height, mass, maxSpeed, speed) {
    this.position = position || new Vector(0, 0);
    this.speed = speed || new Vector(0, 0);

    this.width = width || 1;
    this.height = height || 1;
    this.mass = mass || 5;
    this.maxSpeed = maxSpeed || 12;

    this.world = undefined;
  }

  move () {
    this.calculateSpeed();
    this.applySpeed();
    this.handleCollisions();
  }

  applySpeed () {
    this.position = this.position.add(this.speed);
  }

  handleCollisions () {
    var maxX = this.world.width - this.width;
    var maxY = this.world.height - this.height;

    if(this.position.x >= maxX){this.position.x = maxX; this.speed.x = -this.speed.x*this.world.elasticity;}
    if(this.position.y >= maxY){this.position.y = maxY; this.speed.y = -this.speed.y*this.world.elasticity;}
    if(this.position.x < 0){this.position.x = 0; this.speed.x = -this.speed.x*this.world.elasticity;}
    if(this.position.y < 0){this.position.y = 0; this.speed.y = -this.speed.y*this.world.elasticity;}
  }

  calculateSpeed () {
    var potentialForce = this.potentialForce();
    var potentialAcceleration = potentialForce.divide(this.mass);

    this.speed = this.speed.add(potentialAcceleration);

    var dissipativeAcceleration = this.dissipativeForce(potentialForce).divide(this.mass);
    if(this.speed.length() < dissipativeAcceleration.length()){
      this.speed = new Vector(0,0);
    } else {
      this.speed = this.speed.add(dissipativeAcceleration);
    }

    this.limitMaxSpeed();
  }

  potentialForce () {
    return this.gravityForce();
  }

  dissipativeForce (outerForce) {
    return this.frictionForce(outerForce);
  }

  gravityForce () {
    if(this.world.gravityCenter){
      var gravityVec = this.world.gravityCenter
        .substract(this.position)
        .substract(new Vector(this.width/2, this.height/2));
      var distance = Math.round(gravityVec.length());
      var gravityForce = gravityVec.direction().multiply((this.mass*this.world.gravity) / Math.pow(distance, 2));
      //gravityForce = gravityVec.direction().multiply(this.world.gravity);
    } else {
      var gravityForce = new Vector(0, 0);
    }

    return gravityForce;
  }

  frictionForce (outerForce) {
    if (this.speed.length() === 0){
      if(outerForce.length() <= this.world.friction){
        var frictionForce = outerForce.inverse();
      } else {
        var frictionForce = outerForce.direction().inverse().multiply(this.world.friction);
      }
    } else {
      var frictionForce = this.speed.direction().inverse().multiply(this.world.friction);
    }

    return frictionForce;
  }

  limitMaxSpeed () {
    if(this.speed.length() > this.maxSpeed){
      this.speed = this.speed.direction().multiply(this.maxSpeed);
    }
  }
};
