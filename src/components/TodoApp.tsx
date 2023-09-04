import React, { useState } from "react";
import checkmarkIcon from "../assets/icons8-check-32.png";

function TodoApp() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean; }[]>(
    []
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<"All" | "Active" | "Complete">("All");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") {
      return !todo.completed;
    } else if (filter === "Complete") {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className="w-[500px] mx-auto mt-8">
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Add a new todo..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <button
          className="px-10 py-2 bg-blue-500 text-white rounded-md"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <div className="mb-4 border w-max">
        <button
          className={`${filter === "All"
              ? "bg-gray-300 px-10 py-2 border border-gray-400 text-white"
              : "text-gray-500 px-10 py-2"}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`${filter === "Active"
              ? "bg-gray-300 px-10 py-2 border border-gray-400 text-white"
              : "text-gray-500 px-10 py-2"}`}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className={`${filter === "Complete"
              ? "bg-gray-300 px-10 py-2 border border-gray-400 text-white"
              : "text-gray-500 px-10 py-2"}`}
          onClick={() => setFilter("Complete")}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center mb-2 ${todo.completed ? "line-through text-gray-400" : ""}`}
          >
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                className="mr-2 appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-blue-500 checked:border-transparent"
                checked={todo.completed}
                onChange={() => toggleComplete(index)} />
              {todo.text}
              {todo.completed && (
                <img
                  src={checkmarkIcon}
                  alt="Checkmark"
                  className="w-4 h-4 ml-2 text-green-500" />
              )}
            </label>
          </li>
        ))}
      </ul>

      {todos.some((todo) => todo.completed) && (
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default TodoApp;
