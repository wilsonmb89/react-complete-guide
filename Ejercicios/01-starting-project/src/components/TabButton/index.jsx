const TabButton = ({ children, onSelect, isActive }) => {
  return (
    <li>
      <button className={isActive ? "active" : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
};

export default TabButton;
