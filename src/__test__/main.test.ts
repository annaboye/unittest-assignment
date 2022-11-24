/**
 *@jest-environment jsdom
 */
import * as functions from "../ts/functions";
import * as mainfunctions from "../ts/main";
import { Todo } from "../ts/models/Todo";

describe("clearTodos", () => {
  test("should call 2 functions", () => {
    let spy = jest.spyOn(mainfunctions, "createHtml").mockReturnValue();
    let spyAgain = jest.spyOn(functions, "removeAllTodos").mockReturnValue();

    let list: Todo[] = [new Todo("hej", false)];

    mainfunctions.clearTodos(list);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyAgain).toHaveBeenCalled;
  });
});

describe("init", () => {
  test("should be able to click", () => {
    document.body.innerHTML = `<button id="clearTodos">ok</button>`;

    let spy = jest.spyOn(mainfunctions, "clearTodos").mockReturnValue();

    mainfunctions.init();

    document.getElementById("clearTodos")?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should be able to submit", () => {
    document.body.innerHTML = `
    <form id="newTodoForm">
    <div>
    <input type="text" id="newTodoText"/>
    <button id="submit-btn"></button>
    </div>
    </form>
    `;

    let spy = jest.spyOn(mainfunctions, "createNewTodo").mockReturnValue();

    (document.getElementById("newTodoText") as HTMLInputElement).value =
      "Studdy";

    mainfunctions.init();

    document.getElementById("submit-btn")?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("createNewTodo", () => {
  test("should set success to true", () => {
    let todos: Todo[] = [];
    let todoText: string = "studdy";
    let result = functions.addTodo(todoText, todos);

    mainfunctions.createNewTodo(todoText, todos);

    expect(result.success).toBe(true);
  });

  test("should call function if success", () => {
    let todos: Todo[] = [];
    let todoText: string = "studdy";
    let spy = jest.spyOn(mainfunctions, "createHtml").mockReturnValue();

    mainfunctions.createNewTodo(todoText, todos);

    expect(spy).toHaveBeenCalled();
  });

  test("should call error function if success=false", () => {
    let todos: Todo[] = [];
    let todoText: string = "st";
    let spy = jest.spyOn(mainfunctions, "displayError").mockReturnValue();
    let spyAgain = jest.spyOn(mainfunctions, "createHtml").mockReturnValue();

    mainfunctions.createNewTodo(todoText, todos);

    expect(spy).toHaveBeenCalled();
    expect(spyAgain).toHaveBeenCalled();
  });
});

describe("toggleTodo", () => {
  test("should call functions", () => {
    let todoItem: Todo = new Todo("studdy", false);
    let spy = jest.spyOn(functions, "changeTodo").mockReturnValue();
    let spyAgain = jest.spyOn(mainfunctions, "createHtml").mockReturnValue();

    mainfunctions.toggleTodo(todoItem);

    expect(spy).toHaveBeenCalled();
    expect(spyAgain).toHaveBeenCalled();
  });
});
