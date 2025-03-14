import { createContext, useContext, useState } from "react";

const UserContext = createContext();
function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

function useUserContext(){
  return useContext(UserContext);
}

export {UserContextProvider, useUserContext}

