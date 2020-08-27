import { State } from "./State"

const restrictedTravelEdges = new Map<State, State[]>([
  [State.NY, [
    State.AL,
    State.AR,
    State.CA,
    State.FL,
    State.GA,
    State.GU,
    State.HI,
    State.ID,
    State.IL,
    State.IN,
    State.IA,
    State.KS,
    State.LA,
    State.MN,
    State.MS,
    State.MO,
    State.NE,
    State.NV,
    State.NC,
    State.ND,
    State.OK,
    State.PR,
    State.SC,
    State.SD,
    State.TN,
    State.TX,
    State.UT,
    State.VA,
    State.VI,
    State.WI,
  ]]
]);

export function anyRestricted(visited: State[], dest: State) {
  if (!restrictedTravelEdges.has(dest)) {
    return false;
  }

  return restrictedTravelEdges[dest].some(x => visited.includes(x));
}

export function getRestrictedStates(dest: State): State[] {
  return restrictedTravelEdges[dest];
}