'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as authSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const cleanupAuthUser = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = (user) => {
    setIsLoading(true);
    if (!user) {
      cleanupAuthUser();
    } else {
      setAuthUser({
        uid: user.uid,
        email: user.email,
        username: user.displayName,
      });
      setIsLoading(false);
    }
  };

  // sign up
  const signUp = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setAuthUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        username: userCredential.user.displayName,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // sign in
  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        username: userCredential.user.displayName,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // sign out
  const signOut = () => {
    authSignOut(auth).then(() => cleanupAuthUser());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    setAuthUser,
    isLoading,
    signUp,
    signIn,
    signOut,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
