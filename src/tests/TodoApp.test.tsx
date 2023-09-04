import { render, fireEvent, screen } from "@testing-library/react";
import TodoApp from "../components/TodoApp";
import "@testing-library/jest-dom/extend-expect";

test("adds a new todo", () => {
  render(<TodoApp />);
  const inputElement = screen.getByPlaceholderText("Add a new todo...");
  const addButton = screen.getByText("Add");

  fireEvent.change(inputElement, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  const todoItem = screen.getByText("New Todo");
  expect(todoItem).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoApp />);
  const inputElement = screen.getByPlaceholderText("Add a new todo...");
  const addButton = screen.getByText("Add");

  fireEvent.change(inputElement, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  const checkbox = screen.getByLabelText("New Todo");
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test("clears completed todos", () => {
  render(<TodoApp />);
  const inputElement = screen.getByPlaceholderText("Add a new todo...");
  const addButton = screen.getByText("Add");

  fireEvent.change(inputElement, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  const checkbox = screen.getByLabelText("New Todo");
  fireEvent.click(checkbox);

  const clearButton = screen.getByText("Clear Completed");
  fireEvent.click(clearButton);

  const todoItem = screen.queryByText("New Todo");
  expect(todoItem).not.toBeInTheDocument();
});
