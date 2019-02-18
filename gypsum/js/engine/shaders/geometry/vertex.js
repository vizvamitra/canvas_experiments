Engine.Shaders.Geometry.Vertex = `
  attribute vec4 vPosition;
  attribute vec4 vNormal;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjMatrix;
  uniform mat4 uNormalMatrix;

  varying vec4 fPosition;
  varying vec4 fNormal;
  varying float fDepth;

  void main(){
    vec4 viewPosition = uViewMatrix*uModelMatrix*vPosition;

    gl_Position = uProjMatrix*viewPosition;
    fPosition = viewPosition;
    fNormal = uNormalMatrix*vNormal;
    fDepth = gl_Position.z / gl_Position.w;
  }
`
