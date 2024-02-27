import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const Login = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log("error code", errorCode);
        const errorMessage = error.message;
        console.log("errorMessage", errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log("error email", email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential", credential);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <button className="bg-blue px-8 py-2 text-white" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
