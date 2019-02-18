Engine.ShaderPrograms.Lightning = class LightningShaderProgram extends Engine.ShaderPrograms.Base {
  constructor(gl) {
    super(gl);

    this._vs = Engine.Shaders.Lightning.Vertex;
    this._fs = Engine.Shaders.Lightning.Fragment;

    this.glProgram = this._buildShaderProgram();

    this._uniformLocs = {
      mvpMatrix: undefined,
      screenSize: undefined,
      zBuffer: {
        positionMap: undefined,
        colorMap: undefined,
        normalMap: undefined,
        depthMap: undefined,
      },
      lights: [],
    };

    this._initUniformLocations();
  }

  use() {
    this._gl.useProgram( this.glProgram );
  };

  _initUniformLocations() {
    this._uniformLocs.mvpMatrix = this._gl.getUniformLocation(this.glProgram, 'uMVPMatrix');
    this._uniformLocs.screenSize = this._gl.getUniformLocation(this.glProgram, 'uScreenSize');
    this._uniformLocs.zBuffer.positionMap = this._gl.getUniformLocation(this.glProgram, 'uPositionMap');
    this._uniformLocs.zBuffer.colorMap = this._gl.getUniformLocation(this.glProgram, 'uColorMap');
    this._uniformLocs.zBuffer.normalMap = this._gl.getUniformLocation(this.glProgram, 'uNormalMap');
    this._uniformLocs.zBuffer.depthMap = this._gl.getUniformLocation(this.glProgram, 'uDepthMap');
    this._uniformLocs.zBuffer.ambientMap = this._gl.getUniformLocation(this.glProgram, 'uAmbientMap');
    this._uniformLocs.zBuffer.diffuseMap = this._gl.getUniformLocation(this.glProgram, 'uDiffuseMap');
    this._uniformLocs.zBuffer.specularMap = this._gl.getUniformLocation(this.glProgram, 'uSpecularMap');
    this._uniformLocs.zBuffer.shininessMap = this._gl.getUniformLocation(this.glProgram, 'uShininessMap');

    for (var i=0; i<10; i++){
      this._uniformLocs.lights.push({
        position: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].position'),
        ambient: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].ambient'),
        diffuse: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].diffuse'),
        specular: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].specular'),
        enabled: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].enabled'),
        intensity: this._gl.getUniformLocation(this.glProgram, 'uLights['+i+'].intensity'),
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
  };

  loadMVPMatrix(instance, camera) {
    var mvpMatrix = mult(camera.viewProjMatrix(), instance.modelMatrix());
    this._gl.uniformMatrix4fv(this._uniformLocs.mvpMatrix, false, flatten(mvpMatrix));
  }

  loadUniforms(modelMatrix, lights, camera, width) {
    var mvpMatrix = mult(camera.viewProjMatrix(), modelMatrix);
    this._gl.uniformMatrix4fv(this._uniformLocs.mvpMatrix, false, flatten(mvpMatrix));
    this._gl.uniform1f(this._uniformLocs.screenSize, width);
    this._gl.uniform1i(this._uniformLocs.zBuffer.positionMap, 0);
    this._gl.uniform1i(this._uniformLocs.zBuffer.colorMap, 1);
    this._gl.uniform1i(this._uniformLocs.zBuffer.normalMap, 2);
    this._gl.uniform1i(this._uniformLocs.zBuffer.depthMap, 3);
    this._gl.uniform1i(this._uniformLocs.zBuffer.ambientMap, 4);
    this._gl.uniform1i(this._uniformLocs.zBuffer.diffuseMap, 5);
    this._gl.uniform1i(this._uniformLocs.zBuffer.specularMap, 6);
    this._gl.uniform1i(this._uniformLocs.zBuffer.shininessMap, 7);

    var viewMatrix = camera.viewMatrix();
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
        this._gl.uniform1f(this._uniformLocs.lights[i].intensity, light.intensity);
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
  };
}
