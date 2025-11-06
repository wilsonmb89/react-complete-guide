import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

export default function AccordionItem({ className, children }) {
  return <li className={className}>{children}</li>;
}

AccordionItem.Title = AccordionTitle;
AccordionItem.Content = AccordionContent;
