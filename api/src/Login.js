/*
Login az nagyon hasonló lesz, mint a register csak itt a signIn metódust fogjuk majd használni és a navigate-vel 
pedig a settings-re megyünk innen 
*/ 

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const signIn = async ()=> {
        try {
            const response = await signInWithEmailAndPassword(auth, email, pass);

            navigate("/settings");

        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    } 
    return(
        <div className="container center-text">
            <div className="box mw-500 margin-auto">
                <h3>Email</h3>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}
                className="w-80p center-input"></input>

                <h3>Password</h3>
                <input type="password" onChange={(e)=>setPass(e.target.value)}
                className="w-80p center-input"></input>

                <button onClick={signIn}></button>
            </div>
        </div>
    );
}

export default Login;