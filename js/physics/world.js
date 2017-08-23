window.Physics.World = function(width, height, friction, gravity, elasticity){
  return {
    _bodies: [],
    _gravityCenter: undefined,

    width: width,
    height: height,
    friction: friction || 0,
    gravity: gravity || 10,
    elasticity: elasticity || 1,

    addBody: function(body){
      body.world = this;
      this._bodies.push(body);
    },

    physicsStep: function(){
      for(var i in this._bodies){
        body = this._bodies[i];
        body.move();
      }
    },

    removeBody: function(body){
      index = this._bodies.indexOf(body);
      if(index > -1){ this._bodies.splice(index, 1); }
    }
  };
};
