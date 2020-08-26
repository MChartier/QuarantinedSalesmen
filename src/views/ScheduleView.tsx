import React, { useCallback, useState } from 'react';
import Schedule from '../models/scheduling/Schedule';
import { Typography, makeStyles, Button } from '@material-ui/core';
import ScheduleTable from '../components/scheduling/ScheduleTable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Traveler from '../models/travelers/Traveler';
import Workshop from '../models/workshops/Workshop';
import { Scheduler } from '../services/Scheduler';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  table: {
    flexShrink: 1,
    flexGrow: 1,
    minHeight: 0
  }
}));

export type ScheduleViewProps = {
  travelers: Traveler[],
  workshops: Workshop[]
}

export default function ScheduleView(props: ScheduleViewProps) {
  const classes = useStyles();

  const [schedule, setSchedule] = useState<Schedule|null>(null);

  const handleGenerateSchedule = useCallback(() => {
    let newSchedule = new Scheduler({
      FieldCoordinatorsPerWorkshop: 1,
      PresentersPerWorkshop: 1
    }).Schedule(props.travelers, props.workshops);
    setSchedule(newSchedule);
  }, [props.travelers, props.workshops]);

  return (
    <div className={classes.root}>
      <Typography variant='h6'>Schedule</Typography>
      <ScheduleTable 
        className={classes.table}
        schedule={schedule} />
      <Button 
        onClick={handleGenerateSchedule}
        variant='contained' 
        startIcon={<ScheduleIcon />} 
        color='primary'>Generate Schedule</Button>

    </div>
  )
}