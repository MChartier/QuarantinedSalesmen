import React from 'react';

import { TableCell, TableRow, makeStyles } from '@material-ui/core';
import Assignment from '../../models/scheduling/Assignment';
import { getStateName } from '../../models/rules/State';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export type AssignmentTableRowProps = {
  assignment: Assignment;
}

export default function AssignmentTableRow(props: AssignmentTableRowProps) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell>{props.assignment.workshop.name}</TableCell>
      <TableCell>{props.assignment.travelers.map(x => x.name).join(', ')}</TableCell>
      <TableCell>{getStateName(props.assignment.workshop.state)}</TableCell>
      <TableCell>{props.assignment.workshop.timeInterval.startDate.toDateString()}</TableCell>
      <TableCell>{props.assignment.workshop.timeInterval.endDate.toDateString()}</TableCell>
    </TableRow>
  )
}