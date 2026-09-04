import { useState } from "react";
import type { Task, TaskFilter } from "./types/task";

function App() {
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    savedTasks ? JSON.parse(savedTasks) : [],
  );
  const [title, setTitle] = useState<string>("");
  const [editingId, setEditingid] = useState<number>();
  const [filter, setFilter] = useState<TaskFilter>("all");


  const addTask = (title: string): void => {
    if (title.trim() === "") {
      alert("Please enter the title");
      return;
    }

    if (editingId) {
      
      const editedTasks = tasks.map(item => item.id === editingId ? { ...item, title: title } : item)
      setTasks(editedTasks);
      localStorage.setItem("tasks", JSON.stringify(editedTasks))
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: title,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    setTitle("");
  };

  const handleDelete = (id: number): void => {
    
    const updatedTasks = tasks.filter(item => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

  }

  const handleComplete = (id: number): void => {
    const updatedTasks = tasks.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const handleEdit = (item : Task): void => {
    setEditingid(item.id)
    setTitle(item.title);
  }

  const handleFilterChange = (value: string): void => {
    if (value === "all" || value === "active" || value === "completed") {
      setFilter(value);
    }
  }
  return (
    <>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button onClick={() => addTask(title)}>{editingId ? "Update Task" : "Add Task"}</button>
      <h1>Filter tasks</h1>
      <select name="" id="" onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <div className="tasks">
        {tasks.map((item) => {
          return (
            <div className="task" key={item.id}>
              <div className="titleDiv" style={{textDecoration: item.completed ? "line-through" : "none", color: item.completed ? "grey" : "black"}}>{item.title}</div>
              <div>
                <button onClick={() => handleComplete(item.id)}>
                  {item.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
