import React, { useState, createContext, useContext } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

export const UserProviderContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, loggedIn, tools] = useCurrentUser();
  return (
    <UserProviderContext.Provider
      value={{
        user,
        loggedIn,
        tools,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserProviderContext);
};
