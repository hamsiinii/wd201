/* eslint-env jest */
const {
  todos,
  add,
  markAsComplete,
  all,
  getOverdueItems,
  getDueTodayItems,
  getDueLaterItems,
  toDisplayableList,
} = require("../todo");

describe("Todo List Test Suite", () => {
  // Reset the todos array before every test run
  beforeEach(() => {
    todos.length = 0;
  });

  test("Should add a new todo", () => {
    const todoItem = add("Test Todo");
    expect(todoItem).toEqual({
      title: "Test Todo",
      completed: false,
      // dueDate is a Date instance, so we check its type instead
      dueDate: expect.any(Date),
    });
    // Also ensure the todo has been added to the list
    expect(todos.length).toBe(1);
  });

  test("Should mark a todo as completed", () => {
    add("Test Todo");
    markAsComplete(0);
    expect(todos[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    // Create a date string for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    add("Overdue Todo", yesterdayStr);
    // Add another todo with today's date (by default, add() without a dueDate uses now)
    add("Due Today Todo");

    const overdueItems = getOverdueItems();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Overdue Todo");
  });

  test("Should retrieve due today items", () => {
    // Use today's date in YYYY-MM-DD format
    const todayStr = new Date().toISOString().split("T")[0];

    add("Due Today Todo", todayStr);
    add("Overdue Todo", "2020-01-01"); // Clearly not today

    const dueTodayItems = getDueTodayItems();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe("Due Today Todo");
  });

  test("Should retrieve due later items", () => {
    // Create a date string for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    add("Due Later Todo", tomorrowStr);
    add("Due Today Todo"); // default today's date

    const dueLaterItems = getDueLaterItems();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Due Later Todo");
  });

  test("Should format displayable list correctly", () => {
    // Add two todos with specific due dates
    add("First Todo", "2023-10-01");
    add("Second Todo", "2023-10-02");
    // Mark the first as completed
    markAsComplete(0);

    const displayableList = toDisplayableList(all());
    const expectedOutput = [
      "[x] First Todo 2023-10-01",
      "[ ] Second Todo 2023-10-02",
    ].join("\n");

    expect(displayableList).toBe(expectedOutput);
  });
});
