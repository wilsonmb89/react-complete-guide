// import type { PropsWithChildren } from "react";
import { useContext } from "react";

import TodoItem from "./TodoItem";

import { TodosContext } from "../store/todos/todos-context";

import styles from "./Todos.module.css";

/* export type TodosProps = PropsWithChildren<{
  todos: Array<TodoItemType>;
  onRemoveTodo: (itemId: number) => void;
}>; */

const Todos = () => {
  const { items: todos, removeTodo } = useContext(TodosContext);

  return (
    <ul className={styles["todos"]}>
      {todos.map(({ id, text }) => (
        <TodoItem key={id} text={text} onClickItem={() => removeTodo(id)} />
      ))}
    </ul>
  );
};

export default Todos;
