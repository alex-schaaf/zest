import React, { createContext, PropsWithChildren, useContext } from "react";
import { useAuth, UserWithSettings } from "./auth-context";

const UserContext = createContext<{ user: UserWithSettings }>();

const UserProvider: React.FC<PropsWithChildren> = (props) => {
  const { user } = useAuth();

  return <UserContext.Provider value={{ user }} {...props} />;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
