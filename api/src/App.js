import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Nav/>}>
                    <Route index element={<Registration/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/password-reset' element={<PassReset/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

/*
Ami fontos, hogy be legyen minden itt importálva azok a js-file-ok oldalok, amik majd meg szeretnánk jeleníteni!!!! 

Fel kell telepíteni a npm i react-router-dom-ot és akkor ha több oldalból fog állni, akkor ezt mindenképp fel kell telepíteni 
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );

és mindig kell 3 dolog ilyen sorrendben
    1. BrowserRouter
    2. Routes 
    3. Route

Fontos, hogyha van egy parent route, amit meg szeretnénk jeleníteni mindenhol, akkor az <Route></Route> kell, hogy legyen 
Ilyen pl. a nav, amit minden oldalon meg akarunk jeleníteni 
Az aloldalaknál pedig csak egy <Route/> lesz 

És ha fel van telepítve a npm i react-router-dom és a return-be megcsináltuk a BrowserRouter, Routes, Route-os dolgokat, akkor fontos, hogy ez 
is be legyen majd importálva, de ezt megcsinálja alapból!!!! 
-> 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

Mit kell megadni minden egyes Route-nál kell egy path, ami az url-ben fog megjelenni és kell egy element is 
1. path -> hogy mi legyen a url címe az (al)oldalnak, pl. a főoldal az "/" 
2. element -> hogy mit jelenítünk meg ezen az oldalon, ide kell megadni a js file-t, meghívni -> element={<Nav/>} ilyen formában!!! 

Így néz ki az egész 
-> 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Nav/>}>
                    <Route index element={<Registration/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/password-reset' element={<PassReset/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

Ha van egy <Route></Route> akkor ott meg kell adni a path-ot, de viszont az első sima <Route/>-nál ott azt akarjuk, hogy ugyanaz legyen a path
és ezért ott nem beírjuk újra, hogy path='/', hanem csak annyit írunk, hogy index!!!!!! 

és még fontos, hogy az összes js file, oldal, amiket itt megadtuk Route-nak, azok be legyen importálva, az összes!!!
->
import Nav from './components/Nav'; ....
*/
