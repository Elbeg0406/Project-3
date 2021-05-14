import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { ToDoAPI } from "../api/todo.api";

interface Props {
  open: boolean;
  onSubmit: () => void;
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

const LogOutModal = (props: Props) => {
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
    loginBtn: {
      width: "100%",
      marginTop: 10,
    },
  }));
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const LogOut = async () => {
    const resp = await ToDoAPI.logOut();
    console.log(resp);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Button
        color="primary"
        variant="contained"
        className={classes.loginBtn}
        onClick={LogOut}
      >
        Log Out
      </Button>
    </div>
  );
  return (
    <Modal
      open={props.open}
      onClose={props.onSubmit}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default LogOutModal;
