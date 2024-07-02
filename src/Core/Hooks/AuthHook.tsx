// AuthContext.tsx

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { LoginRequest, AccessTokenResponse } from '../../api';


// Define the shape of your state
interface AuthState {
  token: AccessTokenResponse | null;
  isLoggedIn: boolean;
}

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

// Define the action types
type AuthAction =
  | { type: 'LOGIN'; payload: { token: AccessTokenResponse } }
  | { type: 'LOGOUT' };

type Props = {
    children?: ReactNode;
}
// Define the initial state
const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
};

const initialContext: AuthContextType = {
   state: initialState,
   dispatch: () => {}
}


// Define the reducer function to handle state updates
const authReducer = (state: AuthState, action: AuthAction): AuthState => {

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: !action.payload.token || !action.payload.token === undefined,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};


// Create the context
const AuthContext = createContext<AuthContextType>(initialContext);

// Create a provider component to wrap your app with
export const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>

    );
};

// Create a custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
