import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";

function SignupSign() {
  const [name, setName] = useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]=useState("");
  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          state={name}
          setState={setName}
          label={"Full Name"}
          placeholder={"John Doe"}
        />
        <Input
          state={email}
          setState={setEmail}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
        />
        <Input
          state={password}
          setState={setPassword}
          label={"Password"}
          placeholder={"example@12"}
        />
        <Input
          state={confirmPassword}
          setState={setConfirmPassword}
          label={"Confirm Password"}
          placeholder={"example@12"}
        />
        <Button text={"Signup Using Email and Password"} />
        <p style={{textAlign : "center"}}>or</p>
        <Button text={"Signup Using Google"} blue={true}/>
      </form>
    </div>
  );
}

export default SignupSign;
