// Todo.js
export default function Todo(props) {
  const { todo, setTodos } = props;

  // Use environment variable for API URL
  const apiUrl = process.env.REACT_APP_API_URL;

  const updateTodo = async (todoId, todoStatus) => {
    try {
      const res = await fetch(`${apiUrl}/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status: !todoStatus }), // Toggle status
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      if (json.acknowledged) {
        setTodos((currentTodos) => {
          return currentTodos.map((currentTodo) => {
            if (currentTodo._id === todoId) {
              return { ...currentTodo, status: !currentTodo.status };
            }
            return currentTodo;
          });
        });
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const res = await fetch(`${apiUrl}/${todoId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      if (json.acknowledged) {
        setTodos((currentTodos) => {
          return currentTodos.filter(
            (currentTodo) => currentTodo._id !== todoId
          );
        });
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button className="todo__delete" onClick={() => deleteTodo(todo._id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}
