import SchedulerOptions from '../models/scheduling/SchedulerOptions';
import Traveler from '../models/travelers/Traveler';
import Workshop from '../models/workshops/Workshop';
import Schedule from '../models/scheduling/Schedule';

export class Scheduler {
  private options: SchedulerOptions;

  constructor(options: SchedulerOptions) {
    this.options = options;
  }

  public Schedule(travelers: Traveler[], workshops: Workshop[]): Schedule {
    return {} as Schedule;
  }
}