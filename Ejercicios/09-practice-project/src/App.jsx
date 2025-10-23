import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
  });

  const handleStartProject = () => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: null,
    }));
  };

  const handleCancelCreateProject = () => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: undefined,
    }));
  };

  const handleSaveAddProject = (projectData) => {
    setProjectsState((prevState) => ({
      selectedProject: undefined,
      projects: [
        ...prevState.projects,
        {
          ...projectData,
          id: Date.now(),
          tasks: [],
        },
      ],
    }));
  };

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: prevState.projects.find((project) => project.id === id),
    }));
  };

  const handleDeleteProject = () => {
    setProjectsState((prevState) => ({
      selectedProject: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProject.id
      ),
    }));
  };

  const handleAddNewTask = (newTask) => {
    setProjectsState((prevState) => ({
      selectedProject: {
        ...prevState.selectedProject,
        tasks: [...prevState.selectedProject.tasks, newTask],
      },
      projects: prevState.projects.map((project) => {
        if (project.id === prevState.selectedProject.id) {
          return {
            ...project,
            tasks: [...project.tasks, newTask],
          };
        }

        return project;
      }),
    }));
  };

  const handleUpdateTask = (isCompleted, taskId) => {
    setProjectsState((prevState) => {
      console.log("saving");

      return {
        selectedProject: {
          ...prevState.selectedProject,
          tasks: prevState.selectedProject.tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                isCompleted,
              };
            }

            return task;
          }),
        },
        projects: prevState.projects.map((project) => {
          if (project.id === prevState.selectedProject.id) {
            return {
              ...project,
              tasks: project.tasks.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    isCompleted,
                  };
                }

                return task;
              }),
            };
          }

          return project;
        }),
      };
    });
  };

  let content = null;

  if (projectsState.selectedProject === null) {
    content = (
      <NewProject
        onCancelCreate={handleCancelCreateProject}
        onSaveCreate={handleSaveAddProject}
      />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartProject} />;
  } else {
    content = (
      <SelectedProject
        projectData={projectsState.selectedProject}
        onDeleteProject={handleDeleteProject}
        onAddNewTask={handleAddNewTask}
        onUpdateTask={handleUpdateTask}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        projects={projectsState.projects}
        onStartAddProject={handleStartProject}
        onSelectProject={handleSelectProject}
        idSelectedProject={projectsState.selectedProject?.id}
      />
      {content}
    </main>
  );
}

export default App;
