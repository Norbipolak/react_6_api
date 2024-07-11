/*
Ez lesz a kezdőoldal, ahol tudunk majd regisztálni ennek az url-e, lesz majd a "/"

A firebase-en ki lehet választani, hogy mivel szeretnénk majd rgisztráni ás van egy olyan, hogy email and password 
és vagy egy olyan beépített függvény, hogy createUserWithEmailAndPassword
ez vár 3 paramétert 
1. auth 
2. email, amit majd a felhasználó megad és ezt le kell menteni egy useState-s változóba
3. password, szintén lesz egy input, ahol meg tudja adni a felhasználó a password-ot, amit nekünk le kell menteni egy useState-s változóba 
és majd azt fogjuk megadni a createUserWithEmailAndPassword() függvénynek!!!! 
*/
import { auth } from "./fb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Registration() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    /*
    Kell egy függvény, amit majd megadunk egy button-nak és ezzel fogja majd regisztrálni a user-t 
    ez async függvény kell, hogy legyen, olyan mint egy Api kérésnél és ugyanúgy betesszük egy try-catch blokkba

    fontos, hogy még van egy olyan beépített függvény, hogy sendEmailVerification() és majd a user itt kap egy megerősítő email-t 
    ha sikeresen regisztrált!!!! 
    */ 
    const register = async ()=> {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, pass);

            await sendEmailVerification(auth.currentUser);
            /*
            a currentUser az a felhasználó, aki be van jelentkezve vagy regisztrálva, tehát az auth-nak van egy ilyen property-je, hogy currentUser
            és annak küldjük majd a megerősítő email-t 
            */
            navigate("/login");
            /*
            legvégén ha pedig minden jól ment, akkor átírányitjuk a felhasználót a login oldalra!!! 
            */
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
            /*
            A catch blokkban van egy err object és ha valami nem sikerül try-ban, akkor ezt kapjuk majd 
            leggyakoribb használt az err object-nek, hogy van egy name meg egy message, name az hibának a neve, a message meg leírja emberi 
            nyelven, hogy mi a hiba, de viszont itt a firebase-nél meg Api-nál ez az err objektum egy kicsit más és van egy olyanja, hogy 
            code   
            */
        }
    };

    return(
        <div className="container center-text">
            <div className="box mw-500 margin-auto">
                <h3>Email</h3>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}
                className="center-input w-80p"></input>

                <h3>Password</h3>
                <input type="password" onChange={(e)=>setPass(e.target.value)}
                className="center-input w-80p"></input>

                <button onClick={register}>Register</button>
            </div>
        </div>
    );
}

/*
Itt megszerezzük a email-t meg a pass-t azt egy onChange-vel a useState-s pass-t meg a email-t set-eljük 
és egy button-ra pedig lefut a register függvény, ami a felhasználó regisztrálja!!! 

css
1. van egy container, ami kap egy center-text osztályt, hogy minden text középen legyen majd 
2. vagy egy box aminek megadtunk egy mw-t minimum width-et és egy margin-auto-t, hogy középen legyen!!!! 
3. input-nak meg megadtunk egy w-80p, hogy a box 80%-át vegye fel és egy center-input-ot, aminek az a lényege, hogy display: block legyen 
és legyen egy margin: valami auto; -ja és még alapból a input-oknak adtunk egy padding-et!!!!
*/

export default Registration;

