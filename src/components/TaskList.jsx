import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggleTask, onDeleteTask, emptyText = "No tasks yet." }) {
  if (tasks.length === 0) {
    return <p className="empty-message">{emptyText}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
