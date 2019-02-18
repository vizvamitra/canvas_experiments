Engine.Shaders.Direct.Fragment = `
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
    float attenConstant;
    float attenLinear;
    float attenExp;
    vec4 direction;
    float cutoff;
  };

  struct Material{
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    float shininess;
  };

  uniform Light uLights[10];
  uniform Material uMaterial;

  varying vec3 fPosition;
  varying vec4 fNormal;



  vec4 calcLightInternal(Light light, vec3 L, vec3 E, vec3 N){
    vec4 color = light.ambient * uMaterial.ambient;

    float Kd = dot(L, N);
    if (Kd > 0.0) {
      color += Kd * (light.diffuse * uMaterial.diffuse);

      vec3 H = (L + E) / length(L + E);
      float Ks = clamp(dot(N,H), 0.0, 1.0);
      if (Ks > 0.0){
        Ks =  pow( Ks, uMaterial.shininess );
        color += Ks * (light.specular * uMaterial.specular);
      }
    }

    return color;
  }


  vec4 calcDirectionalLight(Light light, vec3 E, vec3 N){
    vec3 L = normalize( light.position.xyz );

    return calcLightInternal(light, L, E, N);
  }


  vec4 calcPointLight(Light light, vec3 E, vec3 N){
    float distance = length(light.position.xyz - fPosition);
    float attenuation = light.attenConstant + light.attenLinear*distance + light.attenExp*pow(distance, 2.0);

    vec3 L = normalize( light.position.xyz/light.position.w - fPosition );
    vec4 color = calcLightInternal(light, L, E, N);

    return color / attenuation;
  }


  vec4 calcSpotLight(Light light, vec3 E, vec3 N){
    vec3 lightToPixel = normalize(fPosition - light.position.xyz);
    float spotFactor = dot(lightToPixel, normalize(light.direction.xyz));

    if (spotFactor > light.cutoff){
      vec4 color = calcPointLight(light, E, N);
      return color * (1.0 - (1.0 - spotFactor)/(1.0 - light.cutoff));
    } else {
      return vec4(0.0, 0.0, 0.0, 0.0);
    }
  }


  vec4 calcLight(Light light, vec3 E, vec3 N){
    if (light.isDirectionalLight){
      return calcDirectionalLight(light, E, N);
    } else if (light.isPointLight){
      return calcPointLight(light, E, N);
    } else {
      return calcSpotLight(light, E, N);
    }
  }


  void main(){
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec3 N, E;

    N = normalize((gl_FrontFacing ? fNormal : -fNormal).xyz);

    E = normalize(-fPosition);

    for (int i = 0; i < 10; i++){
      if (uLights[i].enabled){
        color += calcLight(uLights[i], E, N);
      }
    }

    gl_FragColor = vec4(color.xyz, 1.0);
  }
`
