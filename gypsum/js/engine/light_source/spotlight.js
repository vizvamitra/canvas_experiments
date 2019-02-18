Engine.LightSource.Spotlight = class SpotlightLightSource {
  constructor(options) {
    this.name = options.name || 'spotlight';
    this.isSpotLight = true;

    this.position = options.position || vec4();

    this.ambient = options.ambient || vec4();
    this.diffuse = options.diffuse || vec4();
    this.specular = options.specular || vec4();

    this.intensity = options.intensity || 1.0;

    this.enabled = (typeof options.enabled == 'undefined') ? true : options.enabled;

    options.attenuation = options.attenuation || {};
    this.attenuation = {
      constant: options.attenuation['constant'] || 1.0,
      linear: options.attenuation['linear'] || 0.0,
      exp: options.attenuation['exp'] || 0.0
    };

    if (options.angles) {
      this.angles = {
        horisontal: options.angles.horisontal || 0,
        vertical: options.angles.vertical || 0
      };
      this.updateDirection();
    } else if (options.direction) {
      var direction = normalize(options.direction);
      direction.push(1.0);
      this.direction = direction;
    } else {
      this.angles = {
        horisontal: 0,
        vertical: 0
      };
      this.updateDirection();
    }
    this.cutoff = options.cutoff || 45.0;
  }

  updateDirection() {
    var newDirection = rotateVec(vec3(0.0, 0.0, -1.0), vec3(1.0, 0.0, 0.0), this.angles.vertical);
    newDirection = rotateVec(newDirection, vec3(0.0, 1.0, 0.0), this.angles.horisontal);
    newDirection.push(1.0);
    this.direction = newDirection;
  }

  affectionDistance() {
    return Math.sqrt((16*Math.max(this.diffuse[0]*this.intensity, this.diffuse[1]*this.intensity, this.diffuse[2]*this.intensity)) / this.attenuation.exp);
  }
}
