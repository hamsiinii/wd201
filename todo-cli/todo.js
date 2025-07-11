/**
 * Todo module - manages todos with due dates and completion status
 */
class Todo {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate ? new Date(dueDate) : new Date();
    this.completed = false;
  }

  markAsCompleted() {
    this.completed = true;
  }
}

function dateString(date) {
  return date.toISOString().split("T")[0];
}

function today() {
  return new Date();
}

function overdue(todo) {
  return !todo.completed && todo.dueDate < today();
}

function dueToday(todo) {
  return !todo.completed && dateString(todo.dueDate) === dateString(today());
}

function dueLater(todo) {
  return !todo.completed && todo.dueDate > today();
}

/**
 * Creates a new todo item
 * @param {string} title - The title of the todo
 * @param {string} dueDate - Optional due date in YYYY-MM-DD format
 * @returns {Todo} The created todo object
 */
function add(title, dueDate) {
  const todo = new Todo(title, dueDate);
  todos.push(todo);
  return todo;
}

/**
 * Marks a todo as completed by index
 * @param {number} index - The index of the todo to mark as completed
 */
function markAsComplete(index) {
  if (index >= 0 && index < todos.length) {
    todos[index].markAsCompleted();
  }
}

/**
 * Returns all todos
 * @returns {Array<Todo>} All todo items
 */
function all() {
  return todos;
}

/**
 * Returns overdue todos
 * @returns {Array<Todo>} Overdue todos
 */
function getOverdueItems() {
  return todos.filter(overdue);
}

/**
 * Returns todos due today
 * @returns {Array<Todo>} Todos due today
 */
function getDueTodayItems() {
  return todos.filter(dueToday);
}

/**
 * Returns todos due later
 * @returns {Array<Todo>} Todos due later
 */
function getDueLaterItems() {
  return todos.filter(dueLater);
}

/**
 * Formats a todo for display in the CLI
 * @param {Todo} todo - The todo to format
 * @returns {string} Formatted string representation
 */
function toDisplayableString(todo) {
  const checkbox = todo.completed ? "[x]" : "[ ]";
  const dueDate = todo.dueDate ? ` ${dateString(todo.dueDate)}` : "";
  return `${checkbox} ${todo.title}${dueDate}`;
}

/**
 * Formats a list of todos for CLI output
 * @param {Array<Todo>} todos - List of todos to format
 * @returns {string} Formatted output string
 */
function toDisplayableList(todos) {
  return todos.map(toDisplayableString).join("\n");
}

const todos = [];

module.exports = {
  todos,
  add,
  markAsComplete,
  all,
  getOverdueItems,
  getDueTodayItems,
  getDueLaterItems,
  toDisplayableList,
};
