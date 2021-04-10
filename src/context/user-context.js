import React, { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.userProfile,
        isAuthenticated: true,
        isLoading: false,
      };
    case "START_LOGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: false,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        error: true,
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        error: false,
      };
    default:
      return { ...state };
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
