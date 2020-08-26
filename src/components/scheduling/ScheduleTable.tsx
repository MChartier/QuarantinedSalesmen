import React from 'react';

import { Table, makeStyles, TableContainer, TableRow, TableCell, Typography } from '@material-ui/core';
import Schedule from '../../models/scheduling/Schedule';
import AssignmentTableRow from './AssignmentTableRow';

const useStyles = makeStyles(() => ({
  root: {
    
  },
  header: {
    fontWeight: 'bold'
  },
  table: {
    height: '100%'
  }
}));

export type ScheduleTableProps = {
  className: string;
  schedule: Schedule | null;
}

export default function ScheduleTable(props: ScheduleTableProps) {
  const classes = useStyles();

  let hasSchedule = props.schedule !== null && props.schedule.assignments.length > 0;
  return (
    <div className={`${props.className} {classes.root}`}>
      {!hasSchedule &&
        <Typography>Schedule is empty!</Typography>
      }
      {hasSchedule && 
        <TableContainer className={classes.table}>
          <Table>
            <TableRow className={classes.header}>
              <TableCell className={classes.header}>Workshop</TableCell>
              <TableCell className={classes.header}>Traveler</TableCell>
              <TableCell className={classes.header}>State</TableCell>
              <TableCell className={classes.header}>Begin Date</TableCell>
              <TableCell className={classes.header}>End Date</TableCell>
            </TableRow>

            {
              props.schedule && 
                props.schedule.assignments.map(assignment => 
                  <AssignmentTableRow assignment={assignment} />)
            }
          </Table>
        </TableContainer>
      }
      
    </div>
    
    
  )
}