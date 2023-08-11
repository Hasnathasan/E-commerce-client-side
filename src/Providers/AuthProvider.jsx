import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUpWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      if(loggedUser){
        axios.post("https://summer-camp-server-black.vercel.app/jwt",{email: loggedUser?.email})
        .then(data => {
          const token = data.data.token;
          localStorage.setItem("access-token", token)
        })
      }
        else{
          localStorage.removeItem("access-token")
        }
        setLoading(false);
    });
    return () => {
      return unsubscribe;
    };
  }, [auth]);
  const info = {
    user,
    loading,
    loginWithEmail,
    signUpWithEmail,
    googleSignIn,
    logOut,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
