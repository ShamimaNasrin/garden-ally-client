/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { IUser } from "../types";
// import { getCurrentUser } from "../service/AuthServices";

interface IUserProviderValues {
  user: IUser | any;
  isLoading: boolean;
  setUser: (user: IUser | any) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    // const user = await getCurrentUser();

    const user = {
      name: "shamima",
      role: "user",
    };

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
