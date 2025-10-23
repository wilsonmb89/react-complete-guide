import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { use } from "react";
import Submit from "./Submit";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext); // useContext(OpinionsContext);

  const newOpinionFormAction = async (prevFormState, formData) => {
    const formDataObject = Object.fromEntries(formData.entries());

    let errors = [];

    if (!isNotEmpty(formDataObject.userName)) {
      errors.push("Your name is required.");
    }

    if (!isNotEmpty(formDataObject.title)) {
      errors.push("Tilte is required.");
    }

    if (!isNotEmpty(formDataObject.body)) {
      errors.push("Your opinion is required.");
    }

    if (errors.length === 0) {
      await addOpinion(formDataObject);
    }

    return {
      errors: errors.length > 0 ? errors : null,
      enteredValues: errors.length > 0 ? { ...formDataObject } : null,
    };
  };

  const [formState, formAction, /* pending */] = useActionState(
    newOpinionFormAction,
    {
      errors: null,
    }
  );

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
