import { useState } from "react";
// FIREBASE IMPORTS
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [error, setError] = useState(null);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User Signed Out");
    } catch (error) {
      console.log("Signout Error:", error.message);
      setError(error.message);
    }
  };

  return { logout, error };
};
