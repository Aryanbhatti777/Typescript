import { useState } from "react";
import type { Task } from "./types/task";

function App() {
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    savedTasks ? JSON.parse(savedTasks) : [],
  );
  const [title, setTitle] = useState<string>("");
  const [editingId , setEditingid] = useState<number>()

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
  return (
    <>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button onClick={() => addTask(title)}>{ editingId ? "Update Task" : "Add Task"}</button>
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
