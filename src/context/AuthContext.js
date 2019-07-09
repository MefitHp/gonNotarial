import React, { createContext, useState } from "react";

const AuthContext = createContext();
let { Provider, Consumer } = AuthContext;

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [isLogged, setIsLogged] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);

  return (
    <Provider
      value={{ user, isLogged, setUser, setIsLogged, modalOpen, setModalOpen }}
    >
      {children}
    </Provider>
  );
}

export { AuthProvider, Consumer as AuthConsumer, AuthContext };
