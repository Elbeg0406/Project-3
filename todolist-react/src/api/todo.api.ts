import { AddToDoDto } from "./dto/add-list.dto";
import { ToDoDto } from "./dto/todo.dto";
import { UpdateListDto } from "./dto/update-list.dto";

export class ToDoAPI {
  static async findAll(): Promise<ToDoDto[]> {
    const resp = await fetch("http://localhost:3001/todo", {
      method: "GET",
    });
    const data = await resp.json();
    return data;
  }

  public static async addOne(createRequest: AddToDoDto) {
    const resp = await fetch("http://localhost:3001/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createRequest),
    });
    const data = await resp.json();
    return data;
  }

  public static async deleteOne(id: number) {
    await fetch(`http://localhost:3001/todo/${id}`, {
      method: "DELETE",
    });
  }

  public static async updateOne(id: number, updateRequest: UpdateListDto) {
    const resp = await fetch(`http://localhost:3001/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRequest),
    });
    const data = await resp.json();
    return data;
  }
}
