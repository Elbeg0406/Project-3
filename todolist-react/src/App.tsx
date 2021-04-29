import React, { useEffect, useState } from "react";
import "./App.css";
import { ToDoAPI } from "./api/todo.api";
import { ToDoDto } from "./api/dto/todo.dto";
import { Grid, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import List from "./components/list";
import AddListModal from "./components/AddListModal";
import EditListModal from "./components/EditListModal";

function App() {
  const [todos, setToDos] = useState<ToDoDto[]>([]);
  const [addListModalOpen, setAddListModalOpen] = useState(false);
  const [updateListModalOpen, setUpdateListModalOpen] = useState(false);
  const [listBeingEdited, setListBeingEdited] = useState<undefined | ToDoDto>(
    undefined
  );
  const addToDo = (todo: ToDoDto) => {
    setToDos([...todos, todo]);
  };

  const removeToDo = (id: number) => {
    setToDos(todos.filter((x) => x.id !== id));
  };

  const updateToDo = (todo: ToDoDto) => {
    setToDos(
      todos.map((x) => {
        if (x.id === todo.id) return todo;
        return x;
      })
    );
  };

  useEffect(() => {
    async function fetchAll() {
      const resp = await ToDoAPI.findAll();
      setToDos(resp);
    }
    fetchAll();
  }, []);

  return (
    <div className="App">
      <AddListModal
        open={addListModalOpen}
        handleClose={() => setAddListModalOpen(false)}
        onToDoCreated={addToDo}
      />
      <EditListModal
        data={listBeingEdited}
        open={updateListModalOpen}
        handleClose={() => setUpdateListModalOpen(false)}
        onListUpdated={updateToDo}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            TODO LIST
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddListModalOpen(true)}
          >
            Add List
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1} style={{ padding: 10 }}>
        {todos.map((todo) => {
          return (
            <Grid item xs={3}>
              <List
                data={todo}
                onToDoDelete={removeToDo}
                onToDoUpdate={(todo: ToDoDto) => {
                  setListBeingEdited(todo);
                  setUpdateListModalOpen(true);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
