import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export const context = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => {
  return useContext(context);
};
