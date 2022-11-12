import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const check = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navitage("/");
        console.log("hhh");
      })
      .catch((error) => {
        setError(true);
      });
  };
//   const SignOut = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//       })
//       .catch((error) => {
//         // An error happened.
//       });
//   };
  return (
    <div>
      <form onSubmit={check}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>{error}</p>
      </form>
    </div>
  );
};
export default Login;
