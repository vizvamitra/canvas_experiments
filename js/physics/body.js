window.Physics.Body = function(position, width, height, mass, maxSpeed, speed){
  return {

    position: position || Vector(0, 0),
    speed: speed || Vector(0, 0),

    width: width || 1,
    height: height || 1,
    mass: mass || 5,
    maxSpeed: maxSpeed || 12,

    world: undefined,

    move: function(){
      this.calculateSpeed();
      this.applySpeed();
      this.handleCollisions();
    },

    applySpeed: function(){
      this.position = this.position.add(this.speed);
    },

    handleCollisions: function(){
      var maxX = this.world.width - this.width;
      var maxY = this.world.height - this.height;

      if(this.position.x >= maxX){this.position.x = maxX; this.speed.x = -this.speed.x*this.world.elasticity;}
      if(this.position.y >= maxY){this.position.y = maxY; this.speed.y = -this.speed.y*this.world.elasticity;}
      if(this.position.x < 0){this.position.x = 0; this.speed.x = -this.speed.x*this.world.elasticity;}
      if(this.position.y < 0){this.position.y = 0; this.speed.y = -this.speed.y*this.world.elasticity;}
    },

    calculateSpeed: function(){
      potentialForce = this.potentialForce();
      potentialAcceleration = potentialForce.divide(this.mass);

      this.speed = this.speed.add(potentialAcceleration);

      dissipativeAcceleration = this.dissipativeForce(potentialForce).divide(this.mass);
      if(this.speed.length() < dissipativeAcceleration.length()){
        this.speed = Vector(0,0);
      } else {
        this.speed = this.speed.add(dissipativeAcceleration);
      }

      this.limitMaxSpeed();
    },

    potentialForce: function(){
      return this.gravityForce();
    },

    dissipativeForce: function(outerForce){
      return this.frictionForce(outerForce);
    },

    gravityForce: function(){
      if(this.world.gravityCenter){
        gravityVec = this.world.gravityCenter
          .substract(this.position)
          .substract(Vector(this.width/2, this.height/2));
        distance = Math.round(gravityVec.length());
        gravityForce = gravityVec.direction().multiply((this.mass*this.world.gravity) / Math.pow(distance, 2));
        //gravityForce = gravityVec.direction().multiply(this.world.gravity);
      } else {
        gravityForce = Vector(0, 0);
      }

      return gravityForce;
    },

    frictionForce: function(outerForce){
      if (this.speed.length() === 0){
        if(outerForce.length() <= this.world.friction){
          frictionForce = outerForce.inverse();
        } else {
          frictionForce = outerForce.direction().inverse().multiply(this.world.friction);
        }
      } else {
        frictionForce = this.speed.direction().inverse().multiply(this.world.friction);
      }

      return frictionForce;
    },

    limitMaxSpeed: function(){
      if(this.speed.length() > this.maxSpeed){
        this.speed = this.speed.direction().multiply(this.maxSpeed);
      }
    },
  };
};
