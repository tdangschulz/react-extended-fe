import { useState, useCallback, useEffect } from "react";
import withRoot from "../hocs/withRoot";

function ParentComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount((c) => c + 1);
  }, [count]);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      Count: {count}
      <ChildComponent onIncrement={incrementCount} onReset={resetCount} />
    </div>
  );
}

type Props = {
  onIncrement: () => void;
  onReset: () => void;
};

function ChildComponent({ onIncrement, onReset }: Props) {
  useEffect(() => {
    console.log("re-rendering");
  });

  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default withRoot(ParentComponent);
