import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = taskTitle.trim();
    if (!cleanTitle) return;

    onAddTask(cleanTitle);
    setTaskTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
        placeholder="Add something worth doing..."
        aria-label="Task name"
      />
      <button type="submit"><span>＋</span> New task</button>
    </form>
  );
}

export default TaskForm;
