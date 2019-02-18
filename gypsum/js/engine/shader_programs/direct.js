Engine.ShaderPrograms.Direct = class DirectShaderProgram extends Engine.ShaderPrograms.Base {
  constructor(gl) {
    super(gl);

    this._vs = Engine.Shaders.Direct.Vertex;
    this._fs = Engine.Shaders.Direct.Fragment;

    this.glProgram = this._buildShaderProgram();

    this._uniformLocs = {
      modelMatrix: undefined,
      viewMatrix: undefined,
      projMatrix: undefined,
      normalMatrix: undefined,
      lights: [],
      material: {
        ambient: undefined,
        diffuse: undefined,
        specular: undefined,
        shininess: undefined
      }
    };

    this._initUniformLocations();
  }

  use() {
    this._gl.useProgram( this.glProgram );
  };

  loadViewProjMatrices(viewMatrix, projMatrix) {
    this._gl.uniformMatrix4fv(this._uniformLocs.viewMatrix, false, flatten(viewMatrix));
    this._gl.uniformMatrix4fv(this._uniformLocs.projMatrix, false, flatten(projMatrix));
  };

  _initUniformLocations() {
    this._uniformLocs.modelMatrix = this._gl.getUniformLocation(this.glProgram, 'uModelMatrix');
    this._uniformLocs.viewMatrix = this._gl.getUniformLocation(this.glProgram, 'uViewMatrix');
    this._uniformLocs.projMatrix = this._gl.getUniformLocation(this.glProgram, 'uProjMatrix');
    this._uniformLocs.normalMatrix = this._gl.getUniformLocation(this.glProgram, 'uNormalMatrix');

    for (var i=0; i<10; i++){
      this._uniformLocs.lights.push({
        position: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].position'),
        ambient: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].ambient'),
        diffuse: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].diffuse'),
        specular: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].specular'),
        enabled: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].enabled'),
        attenConstant: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].attenConstant'),
        attenLinear: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].attenLinear'),
        attenExp: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].attenExp'),
        direction: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].direction'),
        cutoff: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].cutoff'),
        isDirectionalLight: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].isDirectionalLight'),
        isPointLight: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].isPointLight'),
        isSpotLight: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].isSpotLight'),
      });
    }

    this._uniformLocs.material.ambient = this._gl.getUniformLocation(this.glProgram, 'uMaterial.ambient');
    this._uniformLocs.material.diffuse = this._gl.getUniformLocation(this.glProgram, 'uMaterial.diffuse');
    this._uniformLocs.material.specular = this._gl.getUniformLocation(this.glProgram, 'uMaterial.specular');
    this._uniformLocs.material.shininess = this._gl.getUniformLocation(this.glProgram, 'uMaterial.shininess');
  };

  loadUniforms(instance, material, lights, camera) {
    var viewMatrix = camera.viewMatrix();

    this._gl.uniformMatrix4fv(this._uniformLocs.modelMatrix, false, flatten(instance.modelMatrix()));

    var normalMatrix = inverse(mult(viewMatrix, instance.modelMatrix()));
    this._gl.uniformMatrix4fv(this._uniformLocs.normalMatrix, false, flatten(normalMatrix));

    this._gl.uniform4fv(this._uniformLocs.material.ambient, material.ambient);
    this._gl.uniform4fv(this._uniformLocs.material.diffuse, material.diffuse);
    this._gl.uniform4fv(this._uniformLocs.material.specular, material.specular);
    this._gl.uniform1f(this._uniformLocs.material.shininess, material.shininess);

    for (var i=0; i<10; i++){
      var light = lights[i];
      if (light){
        var viewPosition = mult(viewMatrix, light.position);

        this._gl.uniform1i(this._uniformLocs.lights[i].enabled, light.enabled ? 1 : 0);
        this._gl.uniform1i(this._uniformLocs.lights[i].isDirectionalLight, light.isDirectionalLight ? 1 : 0);
        this._gl.uniform1i(this._uniformLocs.lights[i].isPointLight, light.isPointLight ? 1 : 0);
        this._gl.uniform1i(this._uniformLocs.lights[i].isSpotLight, light.isSpotLight ? 1 : 0);
        this._gl.uniform4fv(this._uniformLocs.lights[i].position, viewPosition);
        this._gl.uniform4fv(this._uniformLocs.lights[i].ambient, light.ambient);
        this._gl.uniform4fv(this._uniformLocs.lights[i].diffuse, light.diffuse);
        this._gl.uniform4fv(this._uniformLocs.lights[i].specular, light.specular);
        if (light.isPointLight || light.isSpotLight){
          this._gl.uniform1f(this._uniformLocs.lights[i].attenConstant, light.attenuation.constant);
          this._gl.uniform1f(this._uniformLocs.lights[i].attenLinear, light.attenuation.linear);
          this._gl.uniform1f(this._uniformLocs.lights[i].attenExp, light.attenuation.exp);
          if(light.isSpotLight){
            var viewDirection = mult(inverse(viewMatrix), light.direction);
            this._gl.uniform4fv(this._uniformLocs.lights[i].direction, viewDirection);
            this._gl.uniform1f(this._uniformLocs.lights[i].cutoff, Math.cos(radians(light.cutoff)));
          }
        }
      } else {
        this._gl.uniform1i(this._uniformLocs.lights[i].enabled, 0);
      }
    }
  }
}
