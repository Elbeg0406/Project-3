import React, { useState } from "react";
import { Modal, makeStyles, TextField, Button } from "@material-ui/core";
import { ToDoAPI } from "../api/todo.api";
import { UserDto } from "../api/dto/user.dto";

interface Props {
  open: boolean;
  handleClose: () => void;
  onUserCreated: (user: UserDto) => void;
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

const UserModal = (props: Props) => {
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

  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const addUser = async () => {
    if (pass === passConfirm) {
      const resp = await ToDoAPI.addUser({
        pass,
      });

      props.onUserCreated(resp);
    } else {
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        id="standard-password-input-adornment"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={pass === ""}
        helperText={pass === "" ? "Empty!" : " "}
        onChange={(e) => setPass(e.target.value)}
      />
      <TextField
        id="standard-password-input-error cpass"
        label="Confirm password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassConfirm(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        className={classes.addBtn}
        onClick={addUser}
      >
        Save
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

export default UserModal;
