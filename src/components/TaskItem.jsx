function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={task.completed ? "task-item completed" : "task-item"}>
      <span className="task-accent" />
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <span className="task-copy"><strong>{task.title}</strong><small>{task.completed ? "Completed" : "Personal task"} • Added to your focus list</small></span>
      </label>
      <span className={task.completed ? "status done" : "status active"}>{task.completed ? "Done" : "In progress"}</span>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

export default TaskItem;
