class Vector {
  constructor (x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  length () {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  direction () {
    if(this.length() !== 0){
      return this.divide(this.length());
    } else {
      return new Vector(0, 0);
    }
  }

  inverse () {
    return new Vector(-this.x, -this.y);
  }

  divide (value) {
    if(value === 0){console.error('division by zero!');}
    return new Vector(this.x/value, this.y/value);
  }

  multiply (value) {
    return new Vector(this.x*value, this.y*value);
  }

  add (vector) {
    return new Vector(this.x+vector.x, this.y+vector.y);
  }

  substract (vector) {
    return new Vector(this.x-vector.x, this.y-vector.y);
  }
};
