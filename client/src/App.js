import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL || "https://bytes-notes-app.onrender.com/api";

  useEffect(() => {
    async function getTodos() {
      const res = await fetch(`${API_URL}/todos`);
      const todos = await res.json();
      setTodos(todos);
    }
    getTodos();
  }, [API_URL]);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();
      setContent("");
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <main className="container">
      <h1 className="title">BytesTodos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required
        />
        <button className="form__button" type="submit">
          Create Todo
        </button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              setTodos={setTodos}
              API_URL={API_URL}
            />
          ))}
      </div>
    </main>
  );
}
