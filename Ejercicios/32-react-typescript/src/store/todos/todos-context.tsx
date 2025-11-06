import { createContext } from "react";

export type TodoType = {
  id: number;
  text: string;
};

export type TodosContextType = {
  items: Array<TodoType>;
  addTodo: (todoText: string) => void;
  removeTodo: (todoId: number) => void;
};

const todosContextInitialValue: TodosContextType = {
  items: [],
  addTodo: (todoId) => console.log(`addTodo todoId: ${todoId}`),
  removeTodo: (todoId) => console.log(`removeTodo todoId: ${todoId}`),
};

export const TodosContext = createContext<TodosContextType>(
  todosContextInitialValue
);
