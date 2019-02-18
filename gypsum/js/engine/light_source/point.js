Engine.LightSource.Point = class PointLightSource {
  constructor(options) {
    this.name = options.name || 'point light';
    this.isPointLight = true;

    this.position = options.position || vec4(0.0, 1.0, 0.0, 1.0);

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
  }

  affectionDistance(){
    return Math.sqrt((16*Math.max(this.diffuse[0]*this.intensity, this.diffuse[1]*this.intensity, this.diffuse[2]*this.intensity)) / this.attenuation.exp);
  }
}
