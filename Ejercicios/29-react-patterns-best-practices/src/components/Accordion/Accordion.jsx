import { useContext } from "react";

import AccordionItem from "./AccordionItem";

import { AccordionContext } from "../../store/accordion-context";

const Accordion = ({ className }) => {
  const { items } = useContext(AccordionContext);

  return (
    <ul className={className}>
      {items.map((item) => (
        <Accordion.Item key={item.id} className="accordion-item">
          <AccordionItem.Title id={item.id}>{item.title}</AccordionItem.Title>
          <AccordionItem.Content isOpen={item.isOpen}>
            <article>
              {item.content.map((contentItem) => (
                <p key={contentItem}>{contentItem}</p>
              ))}
            </article>
          </AccordionItem.Content>
        </Accordion.Item>
      ))}
    </ul>
  );
};

export default Accordion;

Accordion.Item = AccordionItem;
