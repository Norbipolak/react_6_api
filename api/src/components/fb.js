/*
Mi az a firebase!! 

A firebase egy Google által fejlesztet dolog amivel mobil alkalmazásokat és weboldalakat tudunk csinálni és elérhető tenni mindenki számára!! 
fontos, ennek vannak különböző metódusai amit tudunk itt használni de ehhez minden esetben a következők kellenek 
1. be legyen importálva a initializeApp és getAuth!!! 
-> 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

de ezek alapvetően meg lesznek ha a következőket csináljuk, ez fontos, hogy minden ilyen weboldal vagy applikációnál ezzel kezdjünk 
->

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

és az is fontos, hogy ezeket majd úgy, mint egy sima függvényt ezeket majd exportálni is kell!!!! 

export {auth};
export default app;

és majd kapunk egy firebaseConfig-ot amit majd ide be kell másolni!!!!
itt kapunk olyanokat, hogy apiKey, authDomain...
az a lényeg, hogy amikor csináljuk a firebase oldalon a dolgokat akkor ezt megcsinálja nekünk automatikusan és ezt ide csak be kell 
másolnunk ezt a firebaseConfig objeltumot!!!!!!! 
*/

//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6PCLwnkgNMkOkseSkej9bp0R544ZYG58",
    authDomain: "lengyel-norbert-auth.firebaseapp.com",
    projectId: "lengyel-norbert-auth",
    storageBucket: "lengyel-norbert-auth.appspot.com",
    messagingSenderId: "393517723332",
    appId: "1:393517723332:web:062c22a4006c2ff2e76391"
};

//Initialize Firebase 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
export default app;

/*
Ez nagyon fontos, hogy ez itt meg legyen és akkr tudunk használni olyan beépített dolgokat, metódusokat hogy
sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword!!!!!!! 

és ezek majd külön oldalon lesznek, mert ez egy bejelentkezési folyamat, elöször be kell regisztrálni, utána be tudunk majd jelentkezni
nagyon fontos még, hogyha mondjuk sikeresen bejelentkeztünk, akkor a felhasználót azt elküldjük egy másik aloldal-ra!!!!!! 
ezt a navigate-vel tudjuk majd megcsinálni -> 
const navigate = useNavigate() 
-> 
navigate("/login") 

így tudunk navigálni egyik oldalról a másikra, hogy kell csinálni egy változóban egy useNavigate() 
és ezt majd meg kell hívni és megadni neki a path-ot, hogy hova akarunk majd navigálni!!!! 

fontos, hogy be legyen importálva, ahol használjuk ezt a useNavigate() beépített függvényt 
-> 
import { useNavigate } from "react-router-dom";!!!!!
*/



