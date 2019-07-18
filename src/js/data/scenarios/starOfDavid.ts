export default {
  name: 'The Star of David',
  type: 'Stars',
  g: 100,
  dt: 0.01,
  elapsedTime: 0,
  rotatingReferenceFrame: 'Origo',
  cameraPosition: 'Free',
  cameraFocus: 'Origo',
  freeOrigo: { x: 0, y: 0, z: 1200000000 },
  massBeingModified: 'Oppenheimer',
  distMax: 400,
  distMin: -400,
  primary: 'Oppenheimer',
  maximumDistance: { name: 'Sun to Neptune', value: 30.1 },
  distanceStep: { name: 'Sun to Earth / 10', value: 0.1 },
  scenarioWikiUrl: 'https://en.wikipedia.org/wiki/Three-body_problem',
  masses: [
    {
      name: 'Feynman',
      type: 'star',
      light: false,
      trailVertices: 450,
      radius: 6e6,
      m: 1e4,
      x: -123.5888490363221,
      y: -71.3583166852466,
      z: 0,
      vx: -1.0702760715048,
      vy: 2.8615747036639,
      vz: 0
    },
    {
      name: 'Sagan',
      type: 'star',
      light: false,
      trailVertices: 450,
      radius: 6e6,
      m: 1e4,
      x: -46.030435228601405,
      y: -27.134665595805902,
      z: 0,
      vx: 77.7912175865836,
      vy: -134.7833138138306,
      vz: 0
    },
    {
      name: 'Einstein',
      type: 'star',
      light: false,
      trailVertices: 450,
      radius: 6e6,
      m: 1e4,
      x: 46.030435228601405,
      y: 27.134665595805902,
      z: 0,
      vx: -77.7912175865836,
      vy: 134.7833138138306,
      vz: 0
    },
    {
      name: 'Oppenheimer',
      type: 'star',
      light: false,
      trailVertices: 450,
      radius: 6e6,
      m: 1e4,
      x: 123.5888490363221,
      y: 71.3583166852466,
      z: 0,
      vx: 1.0702760715048,
      vy: -2.8615747036639,
      vz: 0
    }
  ]
};
