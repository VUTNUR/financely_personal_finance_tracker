import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {auth} from "../../firebase"

function SignupSign() {
  const [name, setName] = useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]=useState("");
  const [loading, setLoading]= useState(false);
 //this function is for signing up with email
 function signupWithEmail(){
  // console.log(name+" "+email+" "+password+" "+confirmPassword)
  //AUTHENTICATE THE USER
  setLoading(true);
  if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
    if(password==confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        toast.success("User Created!")
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false)
        // create doc with user id as following id
        createDoc(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false)
        // ..
      });
    }
    else{
      toast.error("Password and Confirmpassword does not match");
      setLoading(false)
    }
  }
  else{
    toast.error("All Fields are Mandatory!");
    setLoading(false)
  }
 
  function createDoc(user){

  }
 }
  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          type="text"
          state={name}
          setState={setName}
          label={"Full Name"}
          placeholder={"John Doe"}
        />
        <Input
          type="email"
          state={email}
          setState={setEmail}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
        />
        <Input
          type="password"
          state={password}
          setState={setPassword}
          label={"Password"}
          placeholder={"example@12"}
        />
        <Input
          type="password"
          state={confirmPassword}
          setState={setConfirmPassword}
          label={"Confirm Password"}
          placeholder={"example@12"}
        />
        <Button disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signupWithEmail} />
        <p style={{textAlign : "center"}}>or</p>
        <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true}/>
      </form>
    </div>
  );
}

export default SignupSign;
