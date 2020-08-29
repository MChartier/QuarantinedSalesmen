import React from 'react';

import { ListItem, makeStyles, ListItemText, Typography, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Workshop from '../../models/workshops/Workshop';
import { getStateName } from '../../models/rules/State';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  root: {
  }
}));

export type WorkshopListItemProps = {
  handleRemove: () => void;
  workshop: Workshop;
}

export default function WorkshopListItem(props: WorkshopListItemProps) {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.root}
      key={props.workshop.id}
    >
      <ListItemText 
        primary={props.workshop.name}
        secondary={
          <>
            <Typography variant="body2" color="textPrimary">
              {`${props.workshop.timeInterval.startDate.toDateString()} - ` +
                props.workshop.timeInterval.endDate.toDateString()}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {getStateName(props.workshop.state)}
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