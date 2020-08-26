import React from 'react';
import './App.css';
import { Grid, Theme, makeStyles } from '@material-ui/core';
import ScheduleView from './views/ScheduleView';
import WorkshopView from './views/WorkshopView';
import { useDatastore } from './hooks/datastore';
import TravelerView from './views/TravellerView';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    overflow: 'none',
    padding: '1em'
  },
  pane: {
    height: '100%'
  }
}));

function App() {
  const classes = useStyles();
  const { addWorkshop, removeWorkshop, workshops, addTraveler, removeTraveler, travelers } = useDatastore();

  return (
    <Grid className={`App ${classes.root}`} container spacing={3}>
      
      <Grid item xs={3} className={classes.pane}>
        <TravelerView 
          addTraveler={addTraveler}
          removeTraveler={removeTraveler}
          travelers={travelers} />
      </Grid>

      <Grid item xs={3} className={classes.pane}>
        <WorkshopView 
          addWorkshop={addWorkshop}
          removeWorkshop={removeWorkshop}
          workshops={workshops} />
      </Grid>

      <Grid item xs={6} className={classes.pane}>
        <ScheduleView 
          travelers={travelers}
          workshops={workshops} />
      </Grid>

    </Grid>
  );
}

export default App;
