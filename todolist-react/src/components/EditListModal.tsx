import React, { useEffect, useState } from "react";
import { Modal, makeStyles, TextField, Button } from "@material-ui/core";
import { ToDoAPI } from "../api/todo.api";
import { ToDoDto } from "../api/dto/todo.dto";

interface Props {
    open: boolean;
    handleClose: () => void;
    onListUpdated: (todo: ToDoDto) => void;
    data: ToDoDto | undefined;
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
  
  const EditListModal = (props: Props) => {
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

    useEffect(() => {
        if(props.data)
        setItem(props.data.item);
    }, [props.data])

    const updateItem = async () => {
        if(props.data){
            const resp = await ToDoAPI.updateOne(props.data.id, {
            item,
        });
        props.onListUpdated(resp);
        }
    }; 

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2>Edit List</h2>
          <TextField variant="filled" className={classes.textField} onChange={(e) => setItem(e.target.value)} value={item}/>
          <Button color="primary" variant="contained" className={classes.addBtn} onClick={updateItem}>Update List</Button>
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

export default EditListModal;
