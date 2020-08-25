import { TravelerType } from "./TravelerType";
import { State } from "../rules/State";

export default interface Traveler {
  id: string;
  home: State;
  name: string;
  type: TravelerType;
}