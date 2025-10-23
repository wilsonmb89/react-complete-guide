import React, { useRef } from "react";
import Input from "../Input";
import Modal from "../Modal";

const NewProject = ({ onCancelCreate, onSaveCreate }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const duedateRef = useRef(null);
  const modalRef = useRef(null);

  const handleSave = () => {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDuedate = duedateRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDuedate.trim() === ""
    ) {
      modalRef.current.open();

      return;
    }

    onSaveCreate({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDuedate,
    });

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    duedateRef.current.value = "";
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot enter a value</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancelCreate}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={titleRef} label="Title" />
          <Input ref={descriptionRef} isTextarea label="Description" />
          <Input type="date" ref={duedateRef} label="Due Date" />
        </div>
      </div>
    </>
  );
};

export default NewProject;
