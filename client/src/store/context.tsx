/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const value = {
  token: undefined || "",
  error: { error: "", isOpen: "", title: "" },
  isMobileMenuOpen: false,
  isLoggedIn: false,
  isSpinnerLoading: false,
  currentUser: {
    image: "",
    id: "",
    nickName: "",
  },
  handleSetToken: (token: string) => {},
  handleSetUser: (user: any) => {},
  handleLogout: (user: any) => {},
  handleStartSpinner: () => {},
  handleStopSpinner: () => {},
  handleSetError: ({ isOpen, title, error }: any) => {},
  handleMobileMenuToggle: () => {},
  handleMobileMenuClose: () => {},
};

export const UserContext = React.createContext(value);

const ContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>("");
  const [isLoggedIn, setIsLoggedIn] = useState<any>("");
  const [isSpinnerLoading, setIsSpinnerLoading] = useState<any>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState<any>({});

  const navigate = useNavigate();

  const handleSetToken = (token: string) => {
    setToken(token);
  };

  const handleSetUser = (user: any) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleStartSpinner = () => {
    setIsSpinnerLoading(true);
  };

  const handleStopSpinner = () => {
    setIsSpinnerLoading(false);
  };

  const handleSetError = ({ error, title, isOpen }: any) => {
    setError({ error, title, isOpen });
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        error,
        handleSetToken,
        handleSetUser,
        handleLogout,
        currentUser,
        isLoggedIn,
        token,
        isSpinnerLoading,
        handleStartSpinner,
        handleStopSpinner,
        handleSetError,
        isMobileMenuOpen,
        handleMobileMenuToggle,
        handleMobileMenuClose,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
