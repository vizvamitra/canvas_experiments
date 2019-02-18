Engine.Shaders.Geometry.Fragment = `
  #extension GL_EXT_draw_buffers : require

  precision mediump float;

  struct Material{
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    float shininess;
  };

  varying vec4 fPosition;
  varying vec4 fNormal;
  varying float fDepth;

  uniform Material uMaterial;

  void main(){
    gl_FragData[0] = fPosition;
    gl_FragData[1] = vec4(uMaterial.diffuse.rgb, 1.0);
    gl_FragData[2] = vec4(normalize(gl_FrontFacing ? fNormal : -fNormal).xyz, 1.0);
    gl_FragData[3] = vec4(vec3((fDepth + 1.0) / 2.0), 1.0);
    gl_FragData[4] = uMaterial.ambient;
    gl_FragData[5] = uMaterial.diffuse;
    gl_FragData[6] = uMaterial.specular;
    gl_FragData[7] = vec4(uMaterial.shininess);
  }
`
