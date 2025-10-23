import { useCallback, useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  const handleSetChosenCount = useCallback((countValue) => {
    setChosenCount(countValue);
  }, []);

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSetCount={handleSetChosenCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
