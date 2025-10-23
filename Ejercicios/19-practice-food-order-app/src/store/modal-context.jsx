import { createContext, useReducer } from "react";

const modalContextInitialValue = {
  // eslint-disable-next-line no-unused-vars
  updateModal: (newModal) => {},
  unmountModal: () => {},
};

export const ModalContext = createContext(modalContextInitialValue);

const modalReducerHandler = (state, action) => {
  const { type, payload } = action;

  if (type === "SET_MODAL") {
    return { ...state, modal: payload };
  }

  return state;
};

export default function ModalContextPovider({ children }) {
  const [modalState, modalStateDispatcher] = useReducer(modalReducerHandler, {
    modal: () => null,
  });

  const updateModal = (NewModal) => {
    modalStateDispatcher({
      type: "SET_MODAL",
      payload: NewModal,
    });
  };

  const unmountModal = () => {
    modalStateDispatcher({
      type: "SET_MODAL",
      payload: () => null,
    });
  };

  const { modal: Modal } = modalState;

  const modalContextProviderValue = {
    updateModal,
    unmountModal,
  };

  return (
    <ModalContext.Provider value={modalContextProviderValue}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}
