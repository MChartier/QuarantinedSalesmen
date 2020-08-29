import React, { useState, useCallback } from 'react';
import Workshop from '../models/workshops/Workshop';
import { Typography, makeStyles, Button } from '@material-ui/core';
import WorkshopList from '../components/workshops/WorkshopList';
import AddIcon from '@material-ui/icons/Add';
import { State } from '../models/rules/State';
import AddWorkshopDialog from '../components/workshops/AddWorkshopDialog';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  list: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0
  }
}));

export type WorkshopViewProps = {
  addWorkshop: (name: string, state: State, startDate: Date, endDate: Date) => void;
  removeWorkshop: (id: string) => void;
  workshops: Workshop[];
}

export default function WorkshopView(props: WorkshopViewProps) {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const handleAddWorkshop = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <div className={classes.root}>
        <Typography variant='h6'>Workshops</Typography>
        <WorkshopList 
          className={classes.list}
          removeWorkshop={props.removeWorkshop}
          workshops={props.workshops} />
        <Button 
          onClick={handleAddWorkshop}
          variant='contained' 
          startIcon={<AddIcon />} 
          color='primary'>Add Workshop</Button>
      </div>

      <AddWorkshopDialog
        addWorkshop={props.addWorkshop}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}