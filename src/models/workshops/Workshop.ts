import { State } from "../rules/State";

export default interface Workshop {
  beginDate: Date;
  endDate: Date;
  id: string;
  name: string;
  state: State;
}