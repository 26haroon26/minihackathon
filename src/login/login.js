import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./login.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const check = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login successfully");
        navigate("/createclass");
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
    // <div>
    //   <form onSubmit={check}>
    //     <input
    //       type="email"
    //       placeholder="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //     <p>{error}</p>
    //   </form>
    // </div>
<div className="container">
  <form onSubmit={check}>
    <div className="row">
      <div className="col-25">
        <label htmlFor="email">Email</label>
      </div>
      <div className="col-75">
        <input
          type="email"
          id="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-25">
        <label htmlFor="password">Password</label>
      </div>
      <div className="col-75">
        <input
         type="password"
         id="password"
               placeholder="password"
               onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
 
  
    <div className="row">
      <input type="submit" id="aaaaa" defaultValue="Submit" />
    </div>
  </form>
</div>
    
  );
};
export default Login;


