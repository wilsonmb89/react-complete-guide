import { createContext, useState } from "react";

const accordionContextInitialValue = {
  items: [
    {
      id: "",
      title: "",
      content: [""],
      isOpen: false,
    },
  ],
  onClickItem: (itemId) => {},
};

export const AccordionContext = createContext(accordionContextInitialValue);

const AccordionProvider = ({ children }) => {
  const items = [
    {
      id: 1,
      title: "We got 20 years of experience.",
      content: [
        "You can't go wrong with us",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit officiis iusto doloribus repudiandae, quod molestiae ad, aliquam saepe illo, eaque at velit fuga? Nisi dolore illo inventore quis molestiae aperiam.",
      ],
      isOpen: false,
    },
    {
      id: 2,
      title: "We're working with local guides",
      content: [
        "We are not doing this along from our office.",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit officiis iusto doloribus repudiandae, quod molestiae ad, aliquam saepe illo, eaque at velit fuga? Nisi dolore illo inventore quis molestiae aperiam.",
      ],
      isOpen: false,
    },
  ];

  const [accordionItems, setAccordionItems] = useState(items);

  const onClickItemHandler = (itemId) => {
    setAccordionItems((oldItemsState) =>
      oldItemsState.map((item) => ({
        ...item,
        isOpen: item.id === itemId,
      }))
    );
  };
  
  const accordionContextValue = {
    items: accordionItems,
    onClickItem: onClickItemHandler
  };

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      {children}
    </AccordionContext.Provider>
  );
}

export default AccordionProvider;
