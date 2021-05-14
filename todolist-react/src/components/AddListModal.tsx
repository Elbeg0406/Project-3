import React, { useState } from "react";
import { Modal, makeStyles, TextField, Button } from "@material-ui/core";
import { ToDoAPI } from "../api/todo.api";
import { ToDoDto } from "../api/dto/todo.dto";

interface Props {
  open: boolean;
  handleClose: () => void;
  onToDoCreated: (todo: ToDoDto) => void;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const AddListModal = (props: Props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      width: "100%",
      marginTop: 10,
    },
    addBtn: {
      width: "100%",
      marginTop: 10,
    },
  }));
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const values = {
    today: new Date().toISOString().substring(0, 10),
  };

  const [item, setItem] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const addItem = async () => {
    const resp = await ToDoAPI.addOne({
      item,
      date,
      password,
    });

    props.onToDoCreated(resp);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={values.today}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        placeholder="New ToDo"
        className={classes.textField}
        onChange={(e) => setItem(e.target.value)}
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        className={classes.addBtn}
        onClick={addItem}
      >
        Add New List
      </Button>
    </div>
  );
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default AddListModal;
