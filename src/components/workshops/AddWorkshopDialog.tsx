import React, { useCallback, useState } from 'react';
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Theme } from '@material-ui/core';
import { State } from '../../models/rules/State';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

export type AddWorkshopDialogProps = {
  addWorkshop: (name: string, home: State, beginDate: Date, endDate: Date) => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function AddWorkshopDialog(props: AddWorkshopDialogProps) {
  const classes = useStyles();

  const [name, setName] = useState<string>('');
  const [state, setState] = useState<State>(State.NY);
  const [beginDate, setBeginDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);

  const handleClose = useCallback(() => {
    props.setOpen(false);
  }, [props]);

  const handleSave = useCallback(() => {
    if (name === null) {
      alert('Must provide name!');
      return;
    }

    if (beginDate === null || endDate === null) {
      alert('Must supply begin and end date');
      return;
    }

    if (beginDate > endDate) {
      alert('endDate must be after beginDate!');
      return;
    }

    props.addWorkshop(name, state, beginDate, endDate);
    props.setOpen(false);
    setName('');
    setState(State.NY);
  }, [beginDate, endDate, name, props, state]);

  return (
    <Dialog 
      open={props.open} 
      onClose={handleClose} 
      aria-labelledby="workshop-dialog-title">
      <DialogTitle id="workshop-dialog-title">Add Workshop</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          To add a Workshop, fill in its details and press 'Save'.
        </DialogContentText>
        <TextField className={classes.formControl}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
        />
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="workshop-state-select-label">
            State
          </InputLabel>
          <Select
            labelId="workshop-state-select-label"
            id="workshop-state-select"
            value={state}
            onChange={(event) => {
              setState(event.target.value as State);
            }}
            required
          >
            {
              Object.keys(State).map((stateKey: string) => 
                <MenuItem value={stateKey as State}>
                  {State[stateKey]}
                </MenuItem>
              )
            }
          </Select>
          <FormHelperText>Where the workshop will take place</FormHelperText>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Begin Date"
            value={beginDate}
            onChange={(date) => setBeginDate(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            required
          />

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            required
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}