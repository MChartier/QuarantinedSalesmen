import { State } from "../rules/State";
import TimeInterval from "../scheduling/TimeInterval";

export default interface Workshop {
  id: string;
  name: string;
  state: State;
  timeInterval: TimeInterval;
}