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

  centerPosition () {
    return this.position.add(new Vector(this.width/2, this.height/2))
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
    var potentialForce = Physics.potentialForce(this, this.world.gravitySources());
    var potentialAcceleration = Physics.acceleration(potentialForce, this.mass);

    this.speed = this.speed.add(potentialAcceleration);

    var dissipativeForce = Physics.dissipativeForce(this, potentialForce, this.world.friction);
    var dissipativeAcceleration = Physics.acceleration(dissipativeForce, this.mass);

    if(this.speed.length() < dissipativeAcceleration.length()){
      this.speed = new Vector(0,0);
    } else {
      this.speed = this.speed.add(dissipativeAcceleration);
    }

    this.limitMaxSpeed();
  }

  limitMaxSpeed () {
    if(this.speed.length() > this.maxSpeed){
      this.speed = this.speed.direction().multiply(this.maxSpeed);
    }
  }
};
