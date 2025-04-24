import { useContext, useEffect } from "react";
import { Authcontext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Adminauth = ({ children }) => {
  const navigate = useNavigate(); // Add parentheses to properly call useNavigate
  const { user } = useContext(Authcontext);

  useEffect(() => {
    if (!user) {
      navigate("/admin/login"); // Navigate to the login page if no user is found
    }
  }, [user, navigate]); // Ensure useEffect runs when the user context changes

  // If there's a user, render the children components
  return user ? children : null; // Don't render children if there's no user
};
