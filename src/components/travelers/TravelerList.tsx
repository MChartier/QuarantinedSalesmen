import React from 'react';

import { List, makeStyles, Typography } from '@material-ui/core';
import Traveler from '../../models/travelers/Traveler';
import TravelerListItem from './TravelerListItem';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export type TravelerListProps = {
  className: string;
  removeTraveler: (id: string) => void;
  travelers: Traveler[];
}

export default function TravelerList(props: TravelerListProps) {
  const classes = useStyles();

  return (
    <div className={props.className}>
      {
        props.travelers.length === 0 &&
          <Typography>Traveler list is empty!</Typography>
      }

      <List className={classes.root}>
        
        {
          props.travelers.map(traveler => 
            <TravelerListItem 
              handleRemove={() => {
                props.removeTraveler(traveler.id);
              }}
              traveler={traveler} />)
        }
      </List>
    </div>
  )
}