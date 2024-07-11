import { useState } from "react";
import { auth } from "./fb";
import { sendPasswordResetEmail } from "firebase/auth";

function PassReset() {
    const [email, setEmail] = useState("");

    const resetPass = async (e)=> {
        e.preventDefault()
        /*
        nagyon fontos, hogy itt azért kell a preventDefault, mert egy form-ba csináltuk és ott ha beküldjük, akkor automatikusan 
        frissül!!!!!!! 
        */

        try {
            await sendPasswordResetEmail(auth, email);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    }

    return(
        <div className="container center-text">
            <from className="box mw-500 margin-auto">
                <h3>Email address</h3>
                <input onChange={(e)=>setEmail(e.target.value)}
                className="center-input w-80p" type="text"></input>

                <button onClick={resetPass}
                className="center-input w-80p">
                    Reset password
                </button>
            </from>
        </div>
    );
}

export default PassReset;
