import { useRef, useState } from "react";

export default function SearchableList({ children, itemKeyFn, items }) {
  const [searchTerm, setSearchTerm] = useState("");

  const lastChange = useRef(null);

  const searchResults =
    searchTerm.length > 0
      ? items.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : items;

  const onChangeSearchInputHandler = (event) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      const {
        target: { value },
      } = event;

      lastChange.current = null;
      setSearchTerm(value);
    }, 500);
  };

  return (
    <div className="searchable-list">
      <input
        // value={searchTerm}
        type="search"
        placeholder="Search"
        onChange={onChangeSearchInputHandler}
      />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
