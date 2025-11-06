import { useState, type JSX, type ReactNode } from "react";

import {
  TodosContext,
  type TodosContextType,
  type TodoType,
} from "./todos-context";

type TodosContextProviderProps = {
  children: ReactNode;
};

const TodosContextProvider = ({
  children,
}: TodosContextProviderProps): JSX.Element => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const addTodo = (todoText: string) => {
    setTodos((oldState) => [{ id: Date.now(), text: todoText }, ...oldState]);
  };

  const removeTodo = (todoId: number) => {
    setTodos((oldState) => oldState.filter((todo) => todo.id !== todoId));
  };

  const todosContextProviderValue: TodosContextType = {
    items: todos,
    addTodo,
    removeTodo,
  };

  return (
    <TodosContext.Provider value={todosContextProviderValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
