Engine.Shaders.Lightning.Fragment = `
  precision mediump float;

  struct Light{
    bool enabled;
    bool isDirectionalLight;
    bool isPointLight;
    bool isSpotLight;
    vec4 position;
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    float intensity;
    float attenConstant;
    float attenLinear;
    float attenExp;
    vec4 direction;
    float cutoff;
  };

  uniform Light uLights[10];

  uniform float uScreenSize;
  uniform sampler2D uPositionMap;
  uniform sampler2D uColorMap;
  uniform sampler2D uNormalMap;
  uniform sampler2D uDepthMap;
  uniform sampler2D uAmbientMap;
  uniform sampler2D uDiffuseMap;
  uniform sampler2D uSpecularMap;
  uniform sampler2D uShininessMap;

  vec4 ambient, diffuse, specular;
  float shininess;

  vec2 getTexCoord(){
    return gl_FragCoord.xy / uScreenSize;
  }

  vec4 calcLightInternal(Light light, vec3 L, vec3 E, vec3 N){
    vec4 color = light.ambient * ambient;

    float Kd = dot(L, N);
    if (Kd > 0.0) {
      color += Kd * (light.diffuse * diffuse);

      vec3 H = (L + E) / length(L + E);
      float Ks = clamp(dot(N,H), 0.0, 1.0);
      if (Ks > 0.0){
        Ks = pow( Ks, shininess );
        color += Ks * (light.specular * specular);
      }
    }

    return color*light.intensity;
  }


  vec4 calcDirectionalLight(Light light, vec3 E, vec3 N){
    vec3 L = normalize( light.position.xyz );

    return calcLightInternal(light, L, E, N);
  }


  vec4 calcPointLight(Light light, vec3 E, vec3 N, vec3 P){
    float distance = length(light.position.xyz - P);
    float attenuation = light.attenConstant + light.attenLinear*distance + light.attenExp*pow(distance, 2.0);

    vec3 L = normalize( light.position.xyz/light.position.w - P );
    vec4 color = calcLightInternal(light, L, E, N);

    return color / attenuation;
  }


  vec4 calcSpotLight(Light light, vec3 E, vec3 N, vec3 P){
    vec3 lightToPixel = normalize(P - light.position.xyz);
    float spotFactor = dot(lightToPixel, normalize(light.direction.xyz));

    if (spotFactor > light.cutoff){
      vec4 color = calcPointLight(light, E, N, P);
      return color * (1.0 - (1.0 - spotFactor)/(1.0 - light.cutoff));
    } else {
      return vec4(0.0, 0.0, 0.0, 0.0);
    }
  }


  vec4 calcLight(Light light, vec3 E, vec3 N, vec3 P){
    if (light.isDirectionalLight){
      return calcDirectionalLight(light, E, N);
    } else if (light.isPointLight){
      return calcPointLight(light, E, N, P);
    } else {
      return calcSpotLight(light, E, N, P);
    }
  }

  void main(){
    //vec4 color = texture2D(uColorMap, getTexCoord());
    //vec4 depth = texture2D(uDepthMap, getTexCoord());
    ambient = texture2D(uAmbientMap, getTexCoord());
    diffuse = texture2D(uDiffuseMap, getTexCoord());
    specular = texture2D(uSpecularMap, getTexCoord());
    shininess = texture2D(uShininessMap, getTexCoord()).x;

    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    vec3 P = texture2D(uPositionMap, getTexCoord()).xyz;
    vec3 N = normalize(texture2D(uNormalMap, getTexCoord()).xyz);
    vec3 E = normalize(-P);

    for (int i = 0; i < 10; i++){
      if (uLights[i].enabled){
        color += calcLight(uLights[i], E, N, P);
      }
    }

    gl_FragColor = vec4(color.rgb, 1.0);
  }
`
