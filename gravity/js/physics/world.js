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

  gravitySources () {
    if (this.gravityCenter) {
      var gravitySources = [{position: this.gravityCenter, gravity: this.gravity}];
    } else {
      var gravitySources = [
        {position: new Vector(this.width/4, this.height/2), gravity: this.gravity},
        {position: new Vector(this.width/2 + this.width/4, this.height/2), gravity: this.gravity}
      ];
    }

    return gravitySources;
  }
};
