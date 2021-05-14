import { AddToDoDto } from "./dto/add-list.dto";
import { AddUserDto } from "./dto/add-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ToDoDto } from "./dto/todo.dto";
import { UpdateListDto } from "./dto/update-list.dto";

export class ToDoAPI {
  // ToDo API
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

  // User API
  public static async addUser(createRequest: AddUserDto) {
    const resp = await fetch("http://localhost:3001/todo/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createRequest),
    });
    const data = await resp.json();
    return data;
  }

  public static async logIn(request: LoginUserDto) {
    const resp = await fetch("http://localhost:3001/todo/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data = await resp.json();
    console.log(data);
    return data;
  }

  public static async logOut() {
    // const resp = await fetch("http://localhost:3001/todo/logout", {
    //   method: "POST",
    // });
    return { message: "Log Out" };
  }
}
