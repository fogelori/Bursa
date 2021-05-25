//mixed of websites:
// https://blog.logrocket.com/a-deep-dive-into-react-context-api/
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

import React, { createContext, useState } from "react";

export default function makeStore(initialState) {
  const StateContext = createContext();
  const StateUpdaterContext = createContext();

  function StateProvider({ children }) {
    const [store, setStore] = useState(initialState);
    return (
      <StateContext.Provider value={store}>
        <StateUpdaterContext.Provider value={setStore}>
          {children}
        </StateUpdaterContext.Provider>
      </StateContext.Provider>
    );
  }

  function useStockState() {
    const context = React.useContext(StateContext);
    if (context === undefined) {
      throw new Error("useStockState must be used within a StateProvider");
    }
    return context;
  }

  function useStockUpdater() {
    const context = React.useContext(StateUpdaterContext);
    if (context === undefined) {
      throw new Error("useStockDispatch must be used within a StateProvider");
    }
    return context;
  }
  return [StateProvider, useStockState, useStockUpdater];
}
