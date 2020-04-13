import React, { createContext, useReducer } from "react";

import { SET_IS_ADMIN_LOGGED_IN } from "../utils/const";

const initialState = {
  admin: null,
};

const stateReducer = (state, actions) => {
  switch (actions.type) {
    case SET_IS_ADMIN_LOGGED_IN:
      return { ...state, admin: actions.admin };
    default:
      return;
  }
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
