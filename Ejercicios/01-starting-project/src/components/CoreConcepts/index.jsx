import CoreConceptItem from "../CoreConceptItem";
import Section from "../Section";

import { CORE_CONCEPTS } from "../../data";

import "./index.css";

const CoreConcepts = () => (
  <Section title="Time to get started!" idName={"core-concepts"}>
    <ul>
      {CORE_CONCEPTS.map((dataItem) => (
        <CoreConceptItem key={dataItem.title} {...dataItem} />
      ))}
    </ul>
  </Section>
);

export default CoreConcepts;
