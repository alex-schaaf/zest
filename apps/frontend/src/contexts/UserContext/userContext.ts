import { createContext } from "react";
import { Users, Settings } from "@prisma/client";

type UserContextType = {
  user: Users & { settings: Settings };
};

const UserContext = createContext<UserContextType>();

export default UserContext;
