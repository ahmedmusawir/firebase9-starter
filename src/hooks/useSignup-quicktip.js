import { useState } from "react";
// Firebase Imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName,
      });
      console.log("User Created:", user);
    } catch (error) {
      setError(error.message);
    }
  };
  return { error, signup };
};
