import React, { useContext, useState, useCallback, useEffect } from 'react';
import Traveler from '../models/travelers/Traveler';
import Schedule from '../models/scheduling/Schedule';
import Workshop from '../models/workshops/Workshop';
import { State } from '../models/rules/State';
import { TravelerType } from '../models/travelers/TravelerType';
import { GenerateGuid } from '../services/GuidGenerator';

export interface DatastoreInterface {
  addTraveler: (name: string, home: State, type: TravelerType) => void;
  addWorkshop: (name: string, state: State, beginDate: Date, endDate: Date) => void;
  removeTraveler: (id: string) => void;
  removeWorkshop: (id: string) => void;
  schedule: Schedule|null;
  setSchedule: (schedule: Schedule) => void;
  travelers: Traveler[];
  workshops: Workshop[];
}

export const DatastoreContext = React.createContext<any>(undefined);
export const useDatastore = (): any => useContext(DatastoreContext);
export const DatastoreProvider = ({
  children,
  ...initOptions
}) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [schedule, setSchedule] = useState<Schedule|null>(null);

  const addTraveler = useCallback((name: string, home: State, type: TravelerType): void => {
    travelers.push({
      home,
      id: GenerateGuid(),
      name,
      type
    });
    setTravelers([...travelers]);
  }, [travelers]);

  const addWorkshop = useCallback((name: string, state: State, beginDate: Date, endDate: Date): void => {
    workshops.push({
      beginDate,
      endDate,
      id: GenerateGuid(),
      name,
      state,
    });
    setWorkshops([...workshops]);
  }, [workshops]);

  const removeTraveler = useCallback((id: string) => {
    let toRemove = travelers.findIndex(x => x.id === id);
    travelers.splice(toRemove, 1);
    setTravelers([...travelers]);
  }, [travelers]);

  const removeWorkshop = useCallback((id: string) => {
    let toRemove = workshops.findIndex(x => x.id === id);
    workshops.splice(toRemove, 1);
    setWorkshops([...workshops]);
  }, [workshops]);

  useEffect(() => {
    if (!isInitialized) {
      // Initialize test data
      // TODO: Remove
      addTraveler('Loki', 'WA' as State, 'FieldCoordinator' as TravelerType);
      addTraveler('Ducky', 'WA' as State, 'Presenter' as TravelerType);
      addTraveler('Nutmeg', 'WA' as State, 'FieldCoordinator' as TravelerType);
    
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      addWorkshop('Catalina Wine Mixer', 'CA' as State, today, tomorrow);
      addWorkshop('The Big Show', 'CA' as State, today, tomorrow);
      setIsInitialized(true);
    }
    
  }, [addTraveler, addWorkshop, isInitialized]);

  return (
    <DatastoreContext.Provider
      value={{
        addTraveler,
        addWorkshop,
        removeTraveler,
        removeWorkshop,
        schedule,
        setSchedule,
        travelers,
        workshops
      }}>
      {children}
    </DatastoreContext.Provider>
  );
}