import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LogInProvider = ({ children }) => {
  const [IsLogedIn, setIsLogedIn] = useState(false);
  const [profile, setProfile] = useState({});
  return (
    <LoginContext.Provider
      value={{ IsLogedIn, setIsLogedIn, profile, setProfile }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogIn = () => useContext(LoginContext);

export default LogInProvider;
