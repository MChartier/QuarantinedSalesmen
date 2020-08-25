import React from 'react';

import { Table, makeStyles, TableContainer, TableRow, TableCell, Typography } from '@material-ui/core';
import Schedule from '../../models/scheduling/Schedule';
import AssignmentTableRow from './AssignmentTableRow';

const useStyles = makeStyles(() => ({
  root: {
    
  },
  header: {
    fontWeight: 'bold'
  }
}));

export type ScheduleTableProps = {
  className: string;
  schedule: Schedule | null;
}

export default function ScheduleTable(props: ScheduleTableProps) {
  const classes = useStyles();

  if (props.schedule === null || props.schedule.assignments.length === 0) {
    return (
      <Typography>Schedule is empty!</Typography>
    );
  }

  return (
    <TableContainer className={`${props.className} {classes.root}`}>
      <Table>

        <TableRow className={classes.header}>
          <TableCell className={classes.header}>Workshop</TableCell>
          <TableCell className={classes.header}>Traveler</TableCell>
          <TableCell className={classes.header}>State</TableCell>
          <TableCell className={classes.header}>Begin Date</TableCell>
          <TableCell className={classes.header}>End Date</TableCell>
        </TableRow>

        {
          props.schedule.assignments.map(assignment => 
            <AssignmentTableRow assignment={assignment} />)
        }
      </Table>
    </TableContainer>
  )
}