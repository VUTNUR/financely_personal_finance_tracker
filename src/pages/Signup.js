import React from "react";
import Header from "../components/Header";
import SignupSign from "../components/SIgnupSignin";

const Signup= ()=>{

    return (
        <div>
           <Header />
           <div className="wrapper">
               <SignupSign />
           </div>
        </div>
    )
}

export default Signup;