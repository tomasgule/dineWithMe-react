import React, { useReducer, createContext } from "react";

export const DinnerContext = createContext();

const initialState = {
  dinners: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DINNERS":
      return {
        ...state,
        dinners: action.payload,
      };

    default:
      return { ...state };
  }
};

export const DinnerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DinnerContext.Provider value={[state, dispatch]}>
      {props.children}
    </DinnerContext.Provider>
  );
};
