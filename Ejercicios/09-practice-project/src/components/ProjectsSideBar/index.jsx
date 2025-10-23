import React from "react";
import Button from "../Button";

const ProjectsSideBar = ({
  projects,
  onStartAddProject,
  onSelectProject,
  idSelectedProject,
}) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <Button onClick={onStartAddProject} type="button">
        + Add Project
      </Button>
      <ul className="mt-8">
        {projects?.map(({ id, title }) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-20 hover:bg-stone-800";

          if (idSelectedProject === id) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={id}>
              <button
                className={cssClasses}
                onClick={() => onSelectProject(id)}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProjectsSideBar;
