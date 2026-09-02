import { useState } from "react";
import type { Task } from "./types/task";

function App() {
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    savedTasks ? JSON.parse(savedTasks) : [],
  );
  const [title, setTitle] = useState<string>("");

  const addTask = (title: string): void => {
    if (title.trim() === "") {
      alert("Please enter the title");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTitle("");
  };

  const handleDelete = (id: number): void => {
    
    const updatedTasks = tasks.filter(item => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

  }

  return (
    <>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button onClick={() => addTask(title)}>Add Task</button>
      <div className="tasks">
        {tasks.map((item) => {
          return (
            <div className="task">
              <div className="titleDiv" key={item.id}>
                {item.title}
              </div>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
