import { useState } from "react";

import TabButton from "../TabButton";
import TabContent from "../TabContent";
import Section from "../Section";
import Tabs from "../Tabs";

import { CORE_CONCEPTS } from "../../data";

import "./index.css";

const Buttons = ({ step, setStep }) => (
  <>
    {CORE_CONCEPTS.map((item) => (
      <TabButton
        key={item.id}
        isActive={step === item.id}
        onSelect={() => setStep(item.id)}
      >
        {item.title}
      </TabButton>
    ))}
  </>
);

const Examples = () => {
  const [step, setStep] = useState(null);
 
  return (
    <Section idName="examples" title="Examples">
      <Tabs
        ButtonsContainer="menu"
        buttons={<Buttons step={step} setStep={setStep} />}
      >
        <TabContent step={step} />
      </Tabs>
    </Section>
  );
};

export default Examples;
