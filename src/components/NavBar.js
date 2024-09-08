import React, { useState } from 'react';
import { NavLink, Outlet ,Link,Route,Routes} from 'react-router-dom';
import logo from '../assets/Logo.svg'
import toast from 'react-hot-toast';
function NavBar({logged,setLogged}) {
    return (
        <div>
        <nav className='flex bg-pink-700 items-center h-[60px] justify-evenly'>
        <div>
           <Link to="/">  <img src={logo} ></img></Link>
        </div>
        <div>
        { logged &&
            <Link className='text-xl text-white font-semibold' onClick={()=>setLogged(false)}>Logout</Link>
           }
        </div>
        </nav>
        <Outlet/> 
        </div>
    );
}

export default NavBar;