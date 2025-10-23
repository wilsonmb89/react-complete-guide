import React, { useRef, useState } from "react";
import Modal from "../Modal";

const NewTask = ({ onSaveTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const modalRef = useRef(null);

  const handleOnChangeTitleInput = (event) => {
    setTaskTitle(event.target.value);
  };

  const onSaveTaskHandler = () => {
    if (taskTitle.trim() === '') {
      modalRef.current.open();

      return;
    }

    onSaveTask(taskTitle);

    setTaskTitle('');
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot enter a value
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for the input field
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          onChange={handleOnChangeTitleInput}
          value={taskTitle}
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={onSaveTaskHandler}
          className="text-stone-700 hover:text-stone-950"
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default NewTask;
