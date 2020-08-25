import React, { useState, useCallback } from 'react';
import Traveler from '../models/travelers/Traveler';
import { Typography, makeStyles, Button, Theme } from '@material-ui/core';
import TravelerList from '../components/travelers/TravelerList';
import { TravelerType } from '../models/travelers/TravelerType';
import AddIcon from '@material-ui/icons/Add';
import { State } from '../models/rules/State';
import AddTravelerDialog from '../components/travelers/AddTravelerDialog';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  list: {
    flexGrow: 1
  }
}));

export type TravelerViewProps = {
  addTraveler: (name: string, home: State, type: TravelerType) => void;
  removeTraveler: (id: string) => void;
  travelers: Traveler[];
}

export default function TravelerView(props: TravelerViewProps) {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const handleAddTraveler = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <div className={classes.root}>
        <Typography variant='h6'>Travelers</Typography>
        <TravelerList 
          className={classes.list}
          removeTraveler={props.removeTraveler}
          travelers={props.travelers} />
        <Button 
          onClick={handleAddTraveler}
          variant='contained' 
          startIcon={<AddIcon />} 
          color='primary'>Add Traveler</Button>
      </div>
      <AddTravelerDialog
        addTraveler={props.addTraveler}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}