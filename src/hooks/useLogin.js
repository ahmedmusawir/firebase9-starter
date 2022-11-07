import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// FIREBASE IMPORTS
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Signed In", user);
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      console.log("SignIn Error:", error.message);
      setError(error.message);
    }
  };

  // const login = async (email, password) => {
  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then((res) => {
  //       console.log("User singed in", res.user);
  //       dispatch({ type: "LOGIN", payload: res.user });
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };

  return { login, error };
};
