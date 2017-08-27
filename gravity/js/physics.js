class Physics {
  // Physics engine
  static gravityForce (body, gravitySources) {
    var gravityForce = gravitySources.map( gravitySource => {
        var gravityVec = gravitySource.position.substract(body.centerPosition());
        var distance = Math.round(gravityVec.length());
        var direction = gravityVec.direction();
        var gravityForce = (body.mass*gravitySource.gravity) / Math.pow(distance, 2);
        return direction.multiply(gravityForce);
      })
      .reduce((acc, forceVec) => { return acc.add(forceVec); }, new Vector(0, 0));

    return gravityForce;
  }

  static frictionForce (body, outerForce, friction) {
    if (body.speed.length() === 0){
      if(outerForce.length() <= friction){
        var frictionForce = outerForce.inverse();
      } else {
        var frictionForce = outerForce.direction().inverse().multiply(friction);
      }
    } else {
      var frictionForce = body.speed.direction().inverse().multiply(friction);
    }

    return frictionForce;
  }

  static potentialForce (body, gravitySources) {
    return Physics.gravityForce(body, gravitySources);
  }

  static dissipativeForce (body, outerForce, friction) {
    return Physics.frictionForce(body, outerForce, friction);
  }

  static acceleration (force, mass) {
    return force.divide(mass);
  }
};
