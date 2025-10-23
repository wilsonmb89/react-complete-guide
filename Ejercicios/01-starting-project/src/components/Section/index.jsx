const Section = ({ title, idName, children }) => {
  return (
    <section id={idName}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
