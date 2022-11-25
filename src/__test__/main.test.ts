/**
 *@jest-environment jsdom
 */
import * as functions from "../ts/functions";
import * as mainfunctions from "../ts/main";
import { Todo } from "../ts/models/Todo";
import { IAddResponse } from "../ts/models/IAddResult";
import { describe, test, expect, jest, beforeEach } from "@jest/globals";

describe("clearTodos", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
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
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should be able to click on cleartodo-btn", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul><button id="clearTodos">ok</button>`;

    let spy = jest.spyOn(mainfunctions, "clearTodos").mockReturnValue();

    mainfunctions.init();

    document.getElementById("clearTodos")?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should be able to click on sort-btn", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul><button id="sort">ok</button>`;

    let spy = jest.spyOn(mainfunctions, "sortTodos").mockReturnValue();

    mainfunctions.init();

    document.getElementById("sort")?.click();

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
    <ul id="todos" class="todo"></ul>
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
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should set success to true", () => {
    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
      `;

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
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let todos: Todo[] = [];
    let todoText: string = "t";
    let spy = jest.spyOn(mainfunctions, "displayError").mockReturnValue();

    mainfunctions.createNewTodo(todoText, todos);

    expect(spy).toHaveBeenCalled();
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

describe("createHtml", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should create element", () => {
    document.body.innerHTML = `
  <ul id="todos" class="todo"></ul>
    `;
    let ulTag = document.getElementById("todos") as HTMLUListElement;

    let list: Todo[] = [new Todo("studdy", false), new Todo("städa", false)];
    console.log(list);
    mainfunctions.createHtml(list);

    expect(ulTag.innerHTML).toBe(
      `<li class=\"todo__text\">studdy</li><li class=\"todo__text\">städa</li>`
    );
  });
});

describe("displayError", () => {
  test("should display error-message in html", () => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let show: boolean = true;
    let error: string = "du måste ange";

    mainfunctions.displayError(error, show);

    expect((document.getElementById("error") as HTMLDivElement).innerHTML).toBe(
      "du måste ange"
    );
  });
  test("should remove class", () => {
    document.body.innerHTML = `<div id="error" class="error show"></div>`;

    mainfunctions.displayError("du måste ange", false);

    expect(
      (document.getElementById("error") as HTMLDivElement).classList.length
    ).toBe(1);

    expect((document.getElementById("error") as HTMLDivElement).className).toBe(
      "error"
    );
  });
});

describe("sortTodo", () => {
  test("should sort a list a-ö", () => {
    document.body.innerHTML = `<ul id="todos" class="todo">`;

    let todos: Todo[] = [
      new Todo("studdy", false),
      new Todo("allday", false),
      new Todo("allnight", false),
    ];

    mainfunctions.sortTodos(todos);

    expect(todos[0].text).toBe("allday");
  });
});
