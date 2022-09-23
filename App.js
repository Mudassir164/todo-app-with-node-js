import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import LogInProvider from "./Context/ContextApi";
import MainNavigation from "./Navigation/RootNavigation";

export default function App() {
  return (
    <LogInProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </LogInProvider>
  );
}
