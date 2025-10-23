import React from "react";
import NewTask from "../NewTask";

const Tasks = ({ projectData, onAddNewTask, onUpdateTask }) => {
  const {id: projectId, tasks} = projectData;
  let content = <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>;

  if (tasks.length > 0) {
    content = (
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between my-4">
            <span>{task.title}</span>
            <input onChange={(event) => handleUpdateTask(event, task.id)} type="checkbox"></input>
          </li>
        ))}
      </ul>
    );
  }

  const handleAddTask = (taskTitle) => {
    const newTask = {
      id: `${projectId}-task-${Date.now()}`,
      title: taskTitle,
      isCompleted: false
    };

    onAddNewTask(newTask);
  };

  const handleUpdateTask = (event, taskId) => {
    const isCompleted = event.target.checked;
    onUpdateTask(isCompleted, taskId);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onSaveTask={handleAddTask} />
      {content}
    </section>
  );
};

export default Tasks;
