import { EXAMPLES } from "../../data";

import './index.css';

const TabContent = ({ step }) => {
  const exampleData = EXAMPLES[step];
  
  return (
    <div id="tab-content">
      {exampleData ? (
        <>
          <h3>{exampleData.title}</h3>
          <p>{exampleData.description}</p>
          <pre>
            <code>{exampleData.code}</code>
          </pre>
        </>
      ) : (
        <p>Please select a topic.</p>
      )}
    </div>
  );
};

export default TabContent;
