import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignupSign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  //this function is for signing up with email
  function signupWithEmail() {
    // console.log(name+" "+email+" "+password+" "+confirmPassword)
    //AUTHENTICATE THE USER
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created!");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);
            // create doc with user id as following id
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirmpassword does not match");
        setLoading(false);
      }
    } else {
      toast.error("All Fields are Mandatory!");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoUrl: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        // toast.success("Doc Created!");
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("Doc Already Exists!");
    }
  }
  function loginUsingEmail() {
    // console.log(email+""+password)
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          setEmail("");
          setPassword("");
          // console.log(user)
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All Fields are Mandatory!");
      setLoading(false);
    }
  }
  function googleAuth(){
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast.success("User Authenticated!");
        setLoading(false)
        console.log(user)
        createDoc(user)
        navigate("/dashboard")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false)
       
      });
    }catch(e){
      toast.error(e.message)
      setLoading(false)
    }
  }
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
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
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button onClick={googleAuth}
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
            />
            <p
              style={{ textAlign: "center" }}
              className="p-login"
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account? Click Here
            </p>
          </form>
        </div>
      ) : (
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
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
            />
            <p
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSign;
