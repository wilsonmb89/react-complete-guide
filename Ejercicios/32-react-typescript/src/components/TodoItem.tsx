import type { PropsWithChildren } from "react";

import styles from "./TodoItem.module.css";

export type TodoItemProps = PropsWithChildren<{
  text: string;
  onClickItem: () => void;
}>;

const TodoItem = ({ text, onClickItem }: TodoItemProps) => {
  return (
    <li className={styles["item"]} onClick={onClickItem}>
      {text}
    </li>
  );
};

export default TodoItem;
