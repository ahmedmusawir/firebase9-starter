import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Signed In", user);
    } catch (error) {
      console.log("SignIn Error:", error.message);
      setError(error.message);
    }
  };

  return { login, error };
};
