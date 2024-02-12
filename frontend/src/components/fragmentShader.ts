export const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

#define MAX_STEPS 80
#define MAX_DIST 110.0
#define SURFACE_DIST 0.01

// I recommend setting up your codebase with glsify so you can import these functions
// This function comes from glsl-rotate https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d.glsl
mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotation3d(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

// Tweaked Cosine color palette function from Inigo Quilez
vec3 getColor(float amount) {
  vec3 color = vec3(0.4, 0.4, 0.9) + vec3(0.5) * cos(6.2831 * (vec3(0.00, 0.15, 0.20) + amount * vec3(1.0, 0.7, 0.4	)));
  return color * amount;
}

vec3 repeat(vec3 p, float c) {
  return mod(p,c)-0.5*c;
}

float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float scene(vec3 p) {
  vec3 s = repeat(p - vec3(0.0, 0.0, -5.0), 4.0);
  float sphereDist = length(s) - 0.5;

  float distance = sphereDist;

  return distance;
}

float raymarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  vec3 color = vec3(0.0);

  for(int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * dO;
    float dS = scene(p);

    dO += dS;

    if(dO > MAX_DIST || dS < SURFACE_DIST) {
        break;
    }
  }
  return dO;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(.01, 0);

  vec3 n = scene(p) - vec3(
    scene(p-e.xyy),
    scene(p-e.yxy),
    scene(p-e.yyx));

  return normalize(n);
}

void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  // Light Position
  vec3 lightPosition = vec3(-100.0 * cos(uTime * 0.2), 100.0 * sin(uTime * 0.5), 100.0 * cos(-uTime * 0.5));

  vec3 ro = vec3(0.0, 0.0, 5.0 - uTime * 2.0);
  vec3 rd = rotate(normalize(vec3(uv, -1.0)), vec3(0.0, 1.0, 0.0), -uTime * 0.1);

  float d = raymarch(ro, rd);
  vec3 p = ro + rd * d;

  vec3 color = vec3(0.0);

  if(d<MAX_DIST) {
    vec3 normal = getNormal(p);
    vec3 lightDirection = normalize(lightPosition - p);
    
    float diffuse = max(dot(normal, lightDirection), 0.0);
    color = vec3(1.0, 1.0, 1.0) * getColor(diffuse);
  }

  gl_FragColor = vec4(color, 1.0);
}
`