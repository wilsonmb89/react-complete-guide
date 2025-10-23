import headerIconSrc from "../../assets/react-core-concepts.png";

import './index.css';

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const Header = () => {
  const description = reactDescriptions[getRandomInt(3)];

  return (
    <header>
      <img src={headerIconSrc} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
};

export default Header;
