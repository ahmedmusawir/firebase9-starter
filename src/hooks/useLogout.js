import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// FIREBASE IMPORTS
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User Signed Out");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log("Signout Error:", error.message);
      setError(error.message);
    }
  };

  return { logout, error };
};
