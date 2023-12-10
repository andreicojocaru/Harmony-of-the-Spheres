import * as THREE from "three";
import SceneBase from ".";
import ManifestationManager from "../manifestations";
import background from "../misc/background";
import getIntegrator from "../../physics/integrators";
import { drawMassLabel } from "../labels/labelCallbacks";
import H3 from "../../physics/utils/vector";
import { modifyScenarioProperty } from "../../state/creators";
import { ThunkDispatch } from "redux-thunk";
import { ModifyScenarioPropertyType } from "../../types/actions";
import { ScenarioType } from "../../types/scenario";

class PlanetaryScene extends SceneBase {
  manifestationManager: ManifestationManager;
  scale: number;
  integrator: ReturnType<typeof getIntegrator>;
  previous: {
    cameraFocus: string | null;
    rotatingReferenceFrame: string | null;
    integrator: string;
  };
  utilVector: H3;
  threeUtilityVector: THREE.Vector3;
  clock: THREE.Clock;

  constructor(webGlCanvas: HTMLCanvasElement, labelsCanvas: HTMLCanvasElement) {
    super(webGlCanvas, labelsCanvas);
    this.clock = new THREE.Clock();

    this.scene.add(background(this.textureLoader));

    this.manifestationManager = new ManifestationManager(
      this.scenario.masses,
      this.scene,
      this.textureLoader,
    );
    this.manifestationManager.addManifestations();

    this.utilVector = new H3();
    this.threeUtilityVector = new THREE.Vector3();

    this.scale = 2100000;

    this.integrator = getIntegrator(this.scenario.integrator.name, {
      g: this.scenario.integrator.g,
      dt: this.scenario.integrator.dt,
      masses: this.scenario.masses,
      elapsedTime: this.scenario.elapsedTime,
    });

    this.previous = {
      cameraFocus: null,
      rotatingReferenceFrame: null,
      integrator: this.scenario.integrator.name,
    };

    this.controls.noPan = true;
  }

  iterate = () => {
    const delta = this.clock.getDelta();

    this.labels.clear();

    this.scenario = JSON.parse(JSON.stringify(this.store.getState()));

    this.integrator.sync(this.scenario);

    let massesLength = this.scenario.masses.length;
    const manifestations = this.manifestationManager.manifestations;

    const scale = this.scale;

    if (this.scenario.integrator.name !== this.previous.integrator) {
      this.integrator = getIntegrator(this.scenario.integrator.name, {
        g: this.scenario.integrator.g,
        dt: this.scenario.integrator.dt,
        masses: this.scenario.masses,
        elapsedTime: this.scenario.elapsedTime,
      });

      this.previous.integrator = this.scenario.integrator.name;
    }

    if (this.scenario.playing) {
      this.integrator.iterate();
    }

    const { cameraFocus } = this.scenario.camera;

    const rotatingReferenceFrame = this.scenario.masses.find(
      (mass) => this.scenario.camera.rotatingReferenceFrame === mass.name,
    )!.position;

    for (let i = 0; i < massesLength; i++) {
      const manifestation = manifestations[i];

      const mass = this.scenario.masses[i]!;
      const { name } = mass;

      if (mass.type === "star") {
        const starMaterial =
          // @ts-ignore
          manifestation!.object3D!.getObjectByName("sphere").material;

        starMaterial.uniforms.time.value += 0.007 * delta;
      }

      const rotatedPosition = this.utilVector
        .set(mass.position)
        .subtractFrom(rotatingReferenceFrame)
        .multiplyByScalar(scale)
        .toObject();

      if (this.scenario.graphics.labels) {
        this.labels.drawLabel(
          mass.name,
          this.threeUtilityVector.set(
            rotatedPosition.x,
            rotatedPosition.y,
            rotatedPosition.z,
          ),
          this.camera,
          this.scenario.camera.cameraFocus === mass.name ? true : false,
          "right",
          "white",
          drawMassLabel,
        );
      }

      manifestation!.setPosition(rotatedPosition);

      const trail = manifestation?.object3D.getObjectByName("trail");

      if (
        (!this.scenario.graphics.trails && trail) ||
        (trail &&
          this.scenario.camera.rotatingReferenceFrame !==
            this.previous.rotatingReferenceFrame)
      ) {
        manifestation?.removeTrail();
      }

      if (this.scenario.graphics.trails) {
        const trail = manifestation?.object3D.getObjectByName("trail");

        if (!trail) {
          manifestation?.addTrail();
        }

        if (this.scenario.playing) {
          manifestation?.drawTrail(rotatedPosition);
        }
      }

      if (this.previous.cameraFocus !== cameraFocus && cameraFocus === name) {
        this.previous.cameraFocus = cameraFocus;

        this.camera.position.set(
          rotatedPosition.x,
          rotatedPosition.y,
          rotatedPosition.z + mass.radius * 10,
        );

        this.controls.target.copy(rotatedPosition);
      }

      if (cameraFocus === name) {
        this.controls.customPan.add(
          new THREE.Vector3(
            rotatedPosition.x,
            rotatedPosition.y,
            rotatedPosition.z,
          )
            .clone()
            .sub(this.controls.target),
        );

        this.controls.update();
      }
    }

    if (
      this.scenario.camera.rotatingReferenceFrame !==
      this.previous.rotatingReferenceFrame
    ) {
      this.previous.rotatingReferenceFrame =
        this.scenario.camera.rotatingReferenceFrame;
    }

    (
      this.store.dispatch as ThunkDispatch<
        ScenarioType,
        void,
        ModifyScenarioPropertyType
      >
    )(modifyScenarioProperty({ key: "masses", value: this.integrator.masses }));

    this.renderer.render(this.scene, this.camera);

    this.requestAnimationFrameId = requestAnimationFrame(this.iterate);
  };
}

export default PlanetaryScene;
