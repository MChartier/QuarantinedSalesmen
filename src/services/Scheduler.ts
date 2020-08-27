import SchedulerOptions from '../models/scheduling/SchedulerOptions';
import Traveler from '../models/travelers/Traveler';
import Workshop from '../models/workshops/Workshop';
import Schedule from '../models/scheduling/Schedule';
import { TravelerType } from '../models/travelers/TravelerType';
import { State } from '../models/rules/State';
import { getRestrictedStates } from '../models/rules/StateRules';
import { stringify } from 'querystring';
import Assignment from '../models/scheduling/Assignment';

interface TravelerMetadata {
  lastVisitedMap: Map<State, Date>;
  nextAvailableDate: Date;
}

export class Scheduler {
  private options: SchedulerOptions;

  constructor(options: SchedulerOptions) {
    this.options = options;
  }

  public Schedule(travelers: Traveler[], workshops: Workshop[]): Schedule {
    let fieldCoordinators = travelers.filter(x => x.type === 'FieldCoordinator' as TravelerType);
    let presenters = travelers.filter(x => x.type === TravelerType.Presenter);

    // Order workshops by start date
    let orderedWorkshops = workshops.sort((x, y) => x.beginDate.getTime() - y.beginDate.getTime());

    return this.combineSchedules([
      this.schedule(fieldCoordinators, orderedWorkshops, this.options.FieldCoordinatorsPerWorkshop),
      this.schedule(presenters, orderedWorkshops, this.options.PresentersPerWorkshop)
    ]);
  }

  private combineSchedules(schedules: Schedule[]): Schedule {
    let assignmentsByWorkshop = new Map<string, Assignment>([]);

    for (let schedule of schedules) {
      for (let assignment of schedule.assignments) {
        if (!assignmentsByWorkshop.has(assignment.workshop.id)) {
          assignmentsByWorkshop.set(assignment.workshop.id, {
            travelers: [...assignment.travelers],
            workshop: assignment.workshop
          });
        } else {
          for (let newTraveler of assignment.travelers) {
            assignmentsByWorkshop.get(assignment.workshop.id)?.travelers.push(newTraveler);
          }
        }
      }
    }

    let assignments = Array.from(assignmentsByWorkshop.values());
    return {
      assignments: assignments.sort((x, y) => x.workshop.beginDate.getTime() - y.workshop.beginDate.getTime())
    };
  }

  private isAvailable(travelerMetadata: TravelerMetadata, workshop: Workshop): boolean {
    return travelerMetadata.nextAvailableDate <= workshop.beginDate;
  }

  private isRestricted(travelerMetadata: TravelerMetadata, workshop: Workshop): boolean {
    let restrictedStates = getRestrictedStates(workshop.state);
    
    for (let i in restrictedStates) {
      if (travelerMetadata.lastVisitedMap.has(restrictedStates[i]) &&
        (travelerMetadata.lastVisitedMap.get(restrictedStates[i]) as Date).getDate() > workshop.beginDate.getDate() - 14) {
        return true;
      }
    }

    return false;
  }

  private schedule(travelers: Traveler[], orderedWorkshops: Workshop[], capacity: number = 1): Schedule {
    let schedule: Schedule = {
      assignments: [] 
    };

    // Initialize metadata for travelers
    let travelerMetadataMap = new Map<string, TravelerMetadata>([]);
    for (let traveler of travelers) {
      travelerMetadataMap.set(traveler.id, {
        lastVisitedMap: new Map<State, Date>([]),
        nextAvailableDate: new Date(0)
      });
    }

    // For each workshop
    //   Choose up to 'capacity' travelers to attend from those available
    //     Prefer travelers whose home state does not have restrictions against the workshop state
    //   Remember when each traveler becomes available again
    //   Remember when each traveler last visited each state

    for (let workshop of orderedWorkshops) {
      let scheduledAttendees = 0;

      for (let traveler of travelers) {
        if (scheduledAttendees >= capacity) {
          break;
        }

        if (!travelerMetadataMap.has(traveler.id)) {
          debugger;
        }

        let travelerMetadata = travelerMetadataMap.get(traveler.id);
        if (!travelerMetadata) {
          throw Error('Failed to retrieve metadata for traveler!');
        }

        if (this.isRestricted(travelerMetadata, workshop)) {
          continue;
        }
        
        if (!this.isAvailable(travelerMetadata as TravelerMetadata, workshop)) {
          continue;
        }
        
        schedule.assignments.push({
          travelers: [traveler],
          workshop
        });

        
        travelerMetadata.lastVisitedMap.set(workshop.state, workshop.endDate);
        let nextAvailableDate = new Date();
        nextAvailableDate.setDate(workshop.endDate.getDate() + 1);
        travelerMetadata.nextAvailableDate = nextAvailableDate;
        scheduledAttendees++;
      }
    }

    return schedule;
  }
}