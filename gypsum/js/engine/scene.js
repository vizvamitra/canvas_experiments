Engine.Scene = class Scene {
  constructor() {
    this._instances = [];
    this._lights = [];
  }

  get instances() { return this._instances }
  get lights() { return this._lights }

  createInstance(intanceParams) {
    let instance = new Engine.Instance(intanceParams)
    this._instances.push(instance)
  }

  createLightSource(lightSourceParams) {
    let lightSourceType = lightSourceParams.type || Engine.LightSource.Point

    var light = new lightSourceType({
      position:    lightSourceParams.position    || vec4(0.0, 0.5, 0.5, 1.0),
      ambient:     lightSourceParams.ambient     || vec4(0.2, 0.2, 0.2, 1.0),
      diffuse:     lightSourceParams.diffuse     || vec4(1.0, 1.0, 1.0, 1.0),
      specular:    lightSourceParams.specular    || vec4(1.0, 1.0, 1.0, 1.0),
      attenuation: lightSourceParams.attenuation || { constant: 1.0, linear: 0.3, exp: 1.23 }
    });

    this.lights.push(light);

    return light;
  }
}
