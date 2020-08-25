import React, { useCallback, useState } from 'react';
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Theme } from '@material-ui/core';
import { State } from '../../models/rules/State';
import { TravelerType } from '../../models/travelers/TravelerType';

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

export type AddTravelerDialogProps = {
  addTraveler: (name: string, home: State, type: TravelerType) => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function AddTravelerDialog(props: AddTravelerDialogProps) {
  const classes = useStyles();

  const [name, setName] = useState<string>('');
  const [state, setState] = useState<State>(State.NY);
  const [type, setType] = useState<TravelerType>(TravelerType.FieldCoordinator);

  const handleClose = useCallback(() => {
    props.setOpen(false);
  }, [props]);

  const handleSave = useCallback(() => {
    props.addTraveler(name, state, type);
    props.setOpen(false);
    setName('');
    setState(State.NY);
    setType(TravelerType.FieldCoordinator);
  }, [name, props, state, type]);

  return (
    <Dialog 
      open={props.open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Traveler</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          To add a traveler, fill in their details and press 'Save'.
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
          <InputLabel shrink id="traveler-state-select-label">
            Home State
          </InputLabel>
          <Select
            labelId="traveler-state-select-label"
            id="traveler-state-select"
            value={state}
            onChange={(event) => {
              setState(event.target.value as State);
            }}
          >
            {
              Object.keys(State).map((stateKey: string) => 
                <MenuItem value={stateKey as State}>
                  {State[stateKey]}
                </MenuItem>
              )
            }
          </Select>
          <FormHelperText>Where the traveler lives</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="traveler-type-select-label">
            Role
          </InputLabel>
          <Select
            labelId="traveler-type-select-label"
            id="traveler-type-select"
            value={type}
            onChange={(event) => {
              setType(event.target.value as TravelerType);
            }}
          >
            {
              Object.keys(TravelerType).map((travelerTypeKey: string) => 
                <MenuItem value={travelerTypeKey as TravelerType}>
                  {TravelerType[travelerTypeKey]}
                </MenuItem>
              )
            }
          </Select>
          <FormHelperText>Where the traveler lives</FormHelperText>
        </FormControl>
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