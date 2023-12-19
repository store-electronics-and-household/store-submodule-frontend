import React from 'react';

export interface IContext {
  isLoggedIn: boolean;
  userName?: string;
  userPhone?: string;
}
// @ts-expect-error - context created in App
export const UserContext = React.createContext<IContext>();
