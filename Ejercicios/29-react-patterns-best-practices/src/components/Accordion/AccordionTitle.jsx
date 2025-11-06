import { useContext } from "react";

import { AccordionContext } from "../../store/accordion-context";

export default function AccordionTitle({ id, children }) {
  const { onClickItem } = useContext(AccordionContext);

  const onClickHandler = () => {
    onClickItem(id);
  };

  return (
    <h3 className="accordion-item-title" onClick={onClickHandler}>
      {children}
    </h3>
  );
}
