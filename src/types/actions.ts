import { ScenarioType } from "./scenario";
import {
  MODIFY_SCENARIO_PROPERTY,
  SET_SCENARIO,
  MODIFY_SCENARIO_MASS_PROPERTY,
  DELETE_MASS,
} from "../state/types";

export type SetScenarioActionType = {
  type: typeof SET_SCENARIO;
  payload: ScenarioType;
};

export type ScenarioPropertyType = {
  key: string;
  value: any;
};

export type ScenarioMassPropertyType = {
  key: string;
  value: any;
  name: string;
};

export type ModifyScenarioPropertyType = {
  type: typeof MODIFY_SCENARIO_PROPERTY;
  payload: ScenarioPropertyType;
};

export type ModifyScenarioMassPropertyType = {
  type: typeof MODIFY_SCENARIO_MASS_PROPERTY;
  payload: ScenarioMassPropertyType;
};

export type DeleteScenarioMassType = {
  type: typeof DELETE_MASS;
  payload: string;
};

export type ScenarioActionTypes =
  | SetScenarioActionType
  | ModifyScenarioPropertyType
  | ModifyScenarioMassPropertyType
  | DeleteScenarioMassType;
