import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  isLoading: true,
  email: "",
  fullName: "",
  user: {
    email: "",
    fullName: "",
    role: "",
    gender: "",
    phone: "",
    address: "",
    avatar: "",
  },
  carts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        email: action.payload.email,
        fullName: action.payload.fullName,
        user: {
          ...state.user,
          role: action.payload.role,
        },
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
          role: action.payload.role,
          gender: action.payload.gender,
          phone: action.payload.phone,
          address: action.payload.address,
          avatar: action.payload.avatar,
        },
      };
    case "LOAD_PROFILE":
      return {
        ...state,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
          role: action.payload.role,
          gender: action.payload.gender,
          phone: action.payload.phone,
          address: action.payload.address,
          avatar: action.payload.avatar,
        },
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: {
          ...state.user,
          email: action.payload.email,
          fullName: action.payload.fullName,
          role: action.payload.role,
        },
      };
    case "ADD_TOKEN":
      localStorage.setItem("token", action.payload.token);
      return { ...state };
    case "ADD_CART":
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: {
          email: "",
          fullName: "",
          role: "",
          gender: "",
          phone: "",
          address: "",
          avatar: "",
        },
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
