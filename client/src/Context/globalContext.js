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
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          gender: action.payload.gender,
          phone: action.payload.phone,
          address: action.payload.address,
          avatar: action.payload.avatar,
        },
      };
    case "ADD_CART":
      const filterBook = state.carts.filter(
        (book) => book.id === action.payload.id
      );

      if (filterBook.length > 0) {
        return {
          ...state,
          carts: [...state.carts],
        };
      }
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    case "REMOVE_CART":
      return {
        ...state,
        carts: state.carts.filter((book) => book.id !== action.payload.id),
      };
    case "RELEASE_CART":
      return {
        ...state,
        carts: [],
      };

    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        isLoading: false,
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
