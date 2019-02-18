Engine.LightSource.Directional = class DirectionalLightSource {
  constructor(options) {
    this.name = options.name || 'directional light';
    this.isDirectionalLight = true;

    this.position = options.position || vec4(0.0, -1.0, 0.0, 0.0);

    this.ambient = options.ambient || vec4();
    this.diffuse = options.diffuse || vec4();
    this.specular = options.specular || vec4();

    this.intensity = options.intensity || 1.0;

    this.enabled = (typeof options.enabled == 'undefined') ? true : options.enabled;
  }
}
