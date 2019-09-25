import {
  ScenariosActionTypes,
  ADD_SCENARIO
} from '../../action-types/scenarios';

export default (state = <ScenarioSeed[]>[], action: ScenariosActionTypes) => {
  switch (action.type) {
    case ADD_SCENARIO:
      return [...state, action.payload];

    default:
      return state;
  }
};
