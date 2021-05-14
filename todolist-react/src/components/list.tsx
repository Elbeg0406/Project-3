import { ToDoDto } from "../api/dto/todo.dto";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { ToDoAPI } from "../api/todo.api";

interface Props {
  data: ToDoDto;
  onToDoDelete: (id: number) => void;
  onToDoUpdate: (todo: ToDoDto) => void;
}

const List = ({ data, onToDoDelete, onToDoUpdate }: Props) => {
  const deleteToDo = async () => {
    await ToDoAPI.deleteOne(data.id);
    onToDoDelete(data.id);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          ToDo List: {data.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {data.item}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {data.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Container>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
            onClick={() => onToDoUpdate(data)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            style={{ marginLeft: 10 }}
            onClick={deleteToDo}
          >
            Delete
          </Button>
        </Container>
      </CardActions>
    </Card>
  );
};

export default List;
