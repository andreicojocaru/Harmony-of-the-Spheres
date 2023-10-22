import { VectorType } from "./physics";

export type ScenarioCategoryType = {
  name: string;
  subCategory: string | null;
};

export type ScenarioCameraType = {
  cameraFocus: string;
  cameraPosition: string;
  logarithmicDepthBuffer: boolean;
  rotatingReferenceFrame: string;
};

export type ScenarioIntegratorType = {
  name: string;
  g: number;
  dt: number;
  tol: number;
  maxDt: number;
  minDt: number;
  useBarnesHut: boolean;
  theta: number;
  softeningConstant: number;
};

export type ScenarioBarycenterType = {
  display: boolean;
  barycenterMassOne: string;
  barycenterMassTwo: string;
  systemBarycenter: boolean;
};

export type ScenarioGraphicsType = {
  orbits: boolean;
  habitableZone: boolean;
  scale: number;
  trails: boolean;
  labels: boolean;
};

export type ScenarioMassType = {
  name: string;
  type: string;
  m: number;
  radius: number;
  tilt: number;
  atmosphere: number;
  position: VectorType;
  velocity: VectorType;
};

export type ScenarioMassesType = ScenarioMassType[];

export type ScenarioType = {
  name: string;
  playing: boolean;
  isLoaded: boolean;
  elapsedTime: number;
  collisions: true;
  category: ScenarioCategoryType;
  camera: ScenarioCameraType;
  integrator: ScenarioIntegratorType;
  barycenter: ScenarioBarycenterType;
  graphics: ScenarioGraphicsType;
  masses: ScenarioMassesType;
};
