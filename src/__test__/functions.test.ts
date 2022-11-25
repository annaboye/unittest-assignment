import { describe, test, expect } from "@jest/globals";
import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { IAddResponse } from "../ts/models/IAddResult";
import { Todo } from "../ts/models/Todo";

test("should change boolean", () => {
  let todoItem: Todo = new Todo("hej", false);

  changeTodo(todoItem);

  expect(todoItem.done).toBe(true);
});

describe("addTodo", () => {
  test("should add to list if string > 2", () => {
    let todos: Todo[] = [];
    let todoText: string = "studdy";
    addTodo(todoText, todos);

    expect(todos.length).toBe(1);
    expect(todos[todos.length - 1].text).toBe("studdy");
  });

  test("should not add to list if string < 2", () => {
    let todos: Todo[] = [];
    let todoText: string = "t";
    addTodo(todoText, todos);

    expect(todos.length).toBe(0);
  });

  test("should set errormessage", () => {
    let todos: Todo[] = [];
    let todoText: string = "j";

    let respons: IAddResponse = addTodo(todoText, todos);

    expect(respons.error).toBe("Du måste ange minst två bokstäver");
  });

  test("should set success to true", () => {
    let todos: Todo[] = [];
    let todoText: string = "hej";

    let respons: IAddResponse = addTodo(todoText, todos);

    expect(respons.success).toBe(true);
  });
  test("should set success to false", () => {
    let todos: Todo[] = [];
    let todoText: string = "j";

    let respons: IAddResponse = addTodo(todoText, todos);

    expect(respons.success).toBe(false);
  });

  test("should set done to false", () => {
    let todos: Todo[] = [];
    let todoText: string = "Hej";
    addTodo(todoText, todos);

    expect(todos[0].done).toBe(false);
  });
});

test("should remove all from list", () => {
  let todos: Todo[] = [new Todo("studdy", false), new Todo("workout", false)];
  removeAllTodos(todos);
  expect(todos.length).toBe(0);
});
