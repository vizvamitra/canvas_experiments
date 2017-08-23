Physics.World = class {
  constructor (width, height, friction, gravity, elasticity) {
    this._bodies = [],
    this.gravityCenter = undefined,

    this.width = width;
    this.height = height;
    this.friction = friction || 0;
    this.gravity = gravity || 10;
    this.elasticity = elasticity || 1;
  }

  addBody (body) {
    body.world = this;
    this._bodies.push(body);
  }

  physicsStep () {
    for(var i in this._bodies){
      this._bodies[i].move();
    }
  }

  removeBody (body) {
    var index = this._bodies.indexOf(body);
    if(index > -1){ this._bodies.splice(index, 1); }
  }
};
