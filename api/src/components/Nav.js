import { Link, Outlet } from "react-router-dom";

function Nav() {
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Registration</Link>
                    </li>
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                    <li>
                        <Link to={"/settings"}>Settings</Link>
                    </li>
                    <li>
                        <Link to={"/password-reset"}>Password reset</Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    );
}

export default Nav;

/*
Ami itt nagyon fontos, hogy van egy Nav ami a fő route, ez azt jelenti, hogy ez minden oldalon meg fog majd jelenni 
Ezért itt a return ugy kezdjük, hogy egy <></>
mert kell majd egy return és oda fogja betölteni, ami éppen a nav alatt kell, hogy legyen attól függően, hogy melyik oldalon vagyunk 
ha ez az Outlet ez felette lenne a nav-os dolgok felett, akkor a nav nem felül hanem alul lenne majd, mert oda rakná az adott oldal dolgait!!!!

Fontos
Link (különbség a Link és az a tag között)
hogy itt a link az nem megy át egy másik oldalra, az a-tag viszont arra lett csinálva, hogy egy hyperlink-et fogadjon ami egy 
másik oldalon nyilik majd meg!!!! 

a-tag 
<a href="https://www.example.com" target="_blank">Visit Example.com</a>
<a href="#section1">Go to Section 1</a>

link
<head>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>

A link-nek van egy olyan attributuma, hogy to és ennek tudjuk megadni a path-t és akkor majd az fog megnyilni, de nem egy új lapon 
hanem amin eddig voltunk és ilyenkor megváltozik az url is!!!! 

Az Outlet meg a Link az fontos, hogy be legyen importálva a react-router-dom-ból 
import { Link, Outlet } from "react-router-dom";

*/