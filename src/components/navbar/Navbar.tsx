import React, {useState} from 'react';
import Logo from '../../static/logo.png';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {Menu} from "./Menu";
import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const itemsMenu = new Menu()
    const [nav, setNav] = useState(false);
    return (
        <header className="header">
            <div className="container">
                <div className="box">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt='/'/>
                            <span className="logo_text">Mitch</span>
                        </Link>
                    </div>
                    <ul
                        className={
                            nav ? ["menu", "active"].join(' ') : "menu"
                        }
                    >
                        {itemsMenu.menu.map(item =>
                            <li key={item.title}>
                                <Link onClick={() => setNav(!nav)} to={item.href}>{item.title}</Link>
                            </li>
                        )}
                    </ul>
                    <div onClick={() => setNav(!nav)} className={"mobile_btn"}>
                        {nav ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25}/>}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;