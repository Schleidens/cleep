import { ReactNode, useCallback, useEffect, useState } from "react";
import { context } from "./context";
import { User } from "firebase/auth";
import { auth } from "../firebase/main";

import Loader from "../components/loader";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);

  /* function to set the the context user value if it connected
   and and set it to null if it's not */
  const getUserData = useCallback(async (): Promise<void> => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserData();
      } else {
        setLoading(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [getUserData]);

  const value = { user };

  // Display a loading message while loading
  if (loading) {
    return <Loader />;
  }

  // Provide the user context to child components
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default AuthProvider;
