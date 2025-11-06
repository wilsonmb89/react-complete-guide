import { useActionState, useContext } from "react";

import styles from './NewTodo.module.css';
import { TodosContext } from "../store/todos/todos-context";

interface FormState {
  enteredValues: {
    [key: string]: FormDataEntryValue;
  };
  errors: Array<string>;
}

const NewTodo = () => {
  const { addTodo } = useContext(TodosContext);

  const newTodoFormActionHandler = (
    _prevState: FormState,
    formData: FormData
  ) => {
    const formDataObject = Object.fromEntries(formData.entries());
    const errors = [] as Array<string>;

    if (!formDataObject.text) {
      errors.push('Add valid text');
    }

    if (errors.length === 0) {
      addTodo(formDataObject.text as string);
    }

    return {
      enteredValues: {
        ...formDataObject,
      },
      errors,
    };
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    newTodoFormActionHandler,
    {
      enteredValues: { text: "" },
      errors: [],
    }
  );

  return (
    <form action={formAction} className={styles['form']}>
      <label htmlFor="text">Todo text</label>
      <input
        id="text"
        type="text"
        name="text"
        defaultValue={formState.enteredValues.text as string}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
