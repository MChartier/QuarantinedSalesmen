import Workshop from "./Workshop";
import * as _ from 'lodash';

export default class WorkshopGroup {
  public startDate: Date;
  public workshops: Workshop[];
  
  constructor(workshops: Workshop[]) {
    if (!workshops || workshops.length === 0) {
      throw new Error('Non-empty array of Workshops expected!');
    }

    this.startDate = WorkshopGroup.getNormalizedStartDate(workshops[0]);
    this.workshops = workshops;

    if (workshops.some((workshop) => 
    WorkshopGroup.getNormalizedStartDate(workshop) !== this.startDate
    )) {
      throw new Error('Given workshops do not all start in the same week!');
    }
  }

  /**
   * Gets the Date for the Monday in the same week as the startDate defined on the given Workshop.
   * @param workshop Workshop with start date that is to be normalized.
   * @returns Date for the Monday of the week of the workshop.
   */
  private static getNormalizedStartDate(workshop: Workshop): Date {
    let monday = new Date(workshop.timeInterval.startDate);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    return monday;
  }

  /**
   * Groups the given array of Workshops by week (of start date) into an array of WorkshopGroups.
   * @param workshops Workshops to be grouped by week.
   */
  public static groupByWeek(workshops: Workshop[]): WorkshopGroup[] {
    return _.chain(workshops)
      .groupBy(WorkshopGroup.getNormalizedStartDate)
      .map((value, key) => new WorkshopGroup(value))
      .value();
  }
}