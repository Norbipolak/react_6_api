/*
Amiket itt csinálunk 
1. onAuthStateChanged ami vár egy callback-et mindenképpen!!! és megadjuk neki a user objektumot, amivel majd itt egy useState-s változóba 
elmentjük a user-nek az adatait!!!! 
2. ha az email-je nem lett verifikálva, akkor visszadobjuk a login-re a navigate-vel, van egy olyan paramétere a user objektum-nak, hogy 
emailVerified
elmegyarazas-ban van, hogy milyen metódusokkal és propertikkel rendelkezik egy user objektum!!!! 

van egy olyanja is, hogy updateEmail, amit itt meg is csinálunk, fontos, hogy a auth.currentUser-t általában meg kell adni paraméternek meg 
utána amit éppen kell itt pl. az updateEmail-nél az email-t!!! 
*/

import { useEffect, useState} from "react";
import { auth } from "./fb";
import { onAuthStateChanged, sendEmailVerification, signOut, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Settings() {
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(()=> {
        onAuthStateChanged(auth, (u)=> {
            if(u) { //ha van user objektum, akkor ezzel frissítjük a userData-t az itt megtalálható email-t az email-re!!!!!!! 
                setUserData(u);
                //itt már nem kell bekérni az email-t hanem ez benne lesz a user objektumban és innen a useState-s változónkat set-eljük!!!
                setEmail(u.email);
                //ha nincsen megerősítve az email, akkor menjen a főoldalra 
                if(u.emailVerified === false) 
                    navigate("/");
            } else {
                //ha pedig nincsen user objektum, akkor meg jelentkezzen be 
                navigate("/login");
            }
        });
    }, []);

    /*
    a jelenlegi email-nek a megváltoztatása!!! 
    */
    const modifyEmail = async ()=> {
        try {
            await updateEmail(auth.currentUser, email);
            //ezt majd egy input-ba meg tudja adni a felhasználó, amit lementünk egy useState-s email-be, majd azt megadjuk itt!!! 
            await sendEmailVerification(auth.currentUser);
            //a pedig beírta az email-t arra küldünk egy megerősítő email-t, ugyanúgy, mint az elején regisztráláskor!!!! 
            console.log("Megerősítő email elküldve"); 
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    }

    /*
    Itt meg csak simán kijelentkezünk a signOut metódussal és megadjuk neki az egész auth-ot!!! 
    ezt is mind az összes async-ot bele lehetne tenni egy try-catch blokkba!!! 
    */
    
    const logout = async ()=> {
        await signOut(auth);
    };

    return(
        <div className="container center-text">
            <button onClick={logout}></button>

            <h2>Settings</h2>
            <h3>UID: {userData.uid}</h3>
            <h3>Verfied {userData.emailVerified ? "verified": "not verified"}</h3>

            <h3>Email: </h3>
            <input onChange={(e)=>setEmail(e.target.value)}
            type="text" value={email}></input>

            <button onClick={modifyEmail}></button>
        </div>
    )
}

/*
azért mentetük le a userData-ban a user objektum, hogy itt meg tudjunk belőle jeleníteni pár dolgot pl. emailVerified és a uid-t 

két függvényt, amit csináltunk megadtuk mindegyiket egy button-nak onClick-vel!!!!!!! 
*/

export default Settings;