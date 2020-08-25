import React from 'react';

import { ListItem, makeStyles, ListItemText, Typography, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Traveler from '../../models/travelers/Traveler';
import { getStateName } from '../../models/rules/State';
import { getTravelerTypeName } from '../../models/travelers/TravelerType';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export type TravelerListItemProps = {
  handleRemove: () => void;
  traveler: Traveler;
}

export default function TravelerListItem(props: TravelerListItemProps) {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.root}
      key={props.traveler.id}
    >
      <ListItemText 
        primary={props.traveler.name} 
        secondary={
          <>
            <Typography variant="body2" color="textPrimary">
              {getTravelerTypeName(props.traveler.type)}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {getStateName(props.traveler.home)}
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={props.handleRemove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}