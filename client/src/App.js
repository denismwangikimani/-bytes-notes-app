// App.js
import { useEffect, useState } from "react"; 
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  // Use environment variable for API URL
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const todos = await res.json();
        setTodos(todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    getTodos();
  }, [apiUrl]);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify({ todo: content }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const newTodo = await res.json();
        setContent("");
        setTodos([...todos, newTodo]);
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
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
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
      </div>
    </main>
  );
}
