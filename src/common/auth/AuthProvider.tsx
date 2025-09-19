"use client";

import * as React from "react";
import { AuthContext, AuthUser } from "./AuthContext";

export interface AuthProviderProps {
  user: AuthUser | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  user,
  children,
}) => {
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
