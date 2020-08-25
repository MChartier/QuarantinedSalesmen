import React from 'react';
import Schedule from '../models/scheduling/Schedule';
import { Typography, makeStyles } from '@material-ui/core';
import ScheduleTable from '../components/scheduling/ScheduleTable';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  table: {
    flexShrink: 1
  }
}));

export type ScheduleViewProps = {
  schedule: Schedule | null;
}

export default function ScheduleView(props: ScheduleViewProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h6'>Schedule</Typography>
      <ScheduleTable 
        className={classes.table}
        schedule={props.schedule} />
    </div>
  )
}