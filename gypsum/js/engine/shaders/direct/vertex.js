Engine.Shaders.Direct.Vertex = `
  attribute vec4 vPosition;
  attribute vec4 vNormal;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjMatrix;
  uniform mat4 uNormalMatrix;


  varying vec3 fPosition;
  varying vec4 fNormal;

  void main(){
    vec4 viewPosition = uViewMatrix*uModelMatrix*vPosition;

    gl_Position = uProjMatrix*viewPosition;
    fPosition = viewPosition.xyz;
    fNormal = uNormalMatrix * vNormal;
  }
`
