Engine.Shaders.Lightning.Vertex = `
  attribute vec4 vPosition;
  attribute vec4 vNormal;

  uniform mat4 uMVPMatrix;

  void main(){
    gl_Position = uMVPMatrix*vPosition;
  }
`
