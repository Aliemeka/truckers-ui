import { createContext, FC, useState } from "react";

interface ITruckContext {
  count: number;
  increaseCount: VoidFunction;
}

const initialValues: ITruckContext = {
  count: 0,
  increaseCount: () => {},
};

export const TruckContext = createContext<ITruckContext>(initialValues);

const TruckProvider: FC = ({ children }) => {
  let [count, setCount] = useState<number>(0);

  const increaseCount = () => {
    console.log("Success");
    setCount(count + 1);
  };

  return (
    <TruckContext.Provider value={{ count, increaseCount }}>
      {children}
    </TruckContext.Provider>
  );
};

export default TruckProvider;
