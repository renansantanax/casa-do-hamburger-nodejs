import { createContext, useState } from "react";
import type { UserContextType } from "../types/User";

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
