Engine.Instance = class Instance {
  constructor(options) {
    this.mesh = options.mesh;

    this.name = options.name || this.mesh;
    this.angles = options.angles || vec3(0, 0, 0);
    this.position = options.position || vec3(0.0, 0.0, 0.0);
    this.scale = options.scale || vec3(1.0, 1.0, 1.0);
  };

  modelMatrix() {
    let s = this._scaleMatrix();
    let r = this._rotationMatrix();
    let t = this._translationMatrix();

    return mult(t, mult(r, s));
  };

  _scaleMatrix() {
    return scalem(this.scale[0], this.scale[1], this.scale[2])
  };

  _rotationMatrix() {
    let rx = rotate(this.angles[0], 1.0, 0.0, 0.0);
    let ry = rotate(this.angles[1], 0.0, 1.0, 0.0);
    let rz = rotate(this.angles[2], 0.0, 0.0, 1.0);

    return mult(rz, mult(rx, ry));
  };

  _translationMatrix() {
    return translate(this.position[0], this.position[1], this.position[2]);
  };
}
