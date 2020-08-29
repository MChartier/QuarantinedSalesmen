import React from 'react';

import { List, makeStyles, Typography } from '@material-ui/core';
import Workshop from '../../models/workshops/Workshop';
import WorkshopListItem from './WorkshopListItem';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export type WorkshopListProps = {
  className: string;
  removeWorkshop: (id: string) => void;
  workshops: Workshop[];
}

export default function WorkshopList(props: WorkshopListProps) {
  const classes = useStyles();

  return (
    <div className={props.className}>
      {
        props.workshops.length === 0 &&
        <Typography>Workshop list is empty!</Typography>
      }

      <List className={classes.root}>
        {
          props.workshops.map(workshop => 
            <WorkshopListItem 
              handleRemove={() => {
                props.removeWorkshop(workshop.id);
              }}
              workshop={workshop} />)
        }
      </List>
    </div>
  )
}