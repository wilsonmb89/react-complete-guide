const CoreConceptItem = ({ imageData, title, description }) => (
  <li>
    <img src={imageData.src} alt={imageData.alt} />
    <h3>{title}</h3>
    <p>{description}</p>
  </li>
);

export default CoreConceptItem;
