import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import {signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/UserImg.svg"

function Header(){
    const [user, loading] = useAuthState(auth);
    const navigate= useNavigate();
    useEffect(()=>{
        if(user){
           navigate("/dashboard")
        }

    },[user, loading])
    function logoutFnc(){
        try{ 
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("Logged out Successfully!")
                navigate("/")
              }).catch((error) => {
                // An error happened.
                toast.error(error.message)
              });
        }catch(e){
            toast.error(e.message)
        }
    }
    return (
        <div className="navbar">
            <p className="logo">Financely.</p>
            {
                user && 
                <div style={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
                     <img src={user.photoURL ? user.photoURL : userImg} style={{height:"2rem", width:"2rem", borderRadius:"50%"}}/>
                     <p className="logo link" onClick={logoutFnc}>Logout</p>
                </div>
                
            }
            
        </div>
    )
}

export default Header;