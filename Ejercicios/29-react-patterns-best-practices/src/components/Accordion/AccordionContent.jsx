export default function AccordionContent({ isOpen, children }) {
  return (
    <div className={`accordion-item-content${isOpen ? " open" : ""}`}>
      {children}
    </div>
  );
}
