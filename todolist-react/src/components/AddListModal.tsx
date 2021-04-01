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
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        textField:{
            width: "100%",
            marginTop: 10
        },
        addBtn:{
            width: "100%",
            marginTop: 10
        }
      }));
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();

    const [item, setItem] = useState('')
    const addItem = async () => {
        const resp = await ToDoAPI.addOne({
        item,
    });

    props.onToDoCreated(resp);
    }; 

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2>Add New ToDo List</h2>
          <TextField placeholder="New List" variant="filled" className={classes.textField} onChange={(e) => setItem(e.target.value)}/>
          <Button color="primary" variant="contained" className={classes.addBtn} onClick={addItem}>Add new List</Button>
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
