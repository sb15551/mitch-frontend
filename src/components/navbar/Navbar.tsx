import React, {useState} from 'react';
import Logo from '../../static/logo.png';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import './Navbar.css';
import {Menu} from "./Menu";

const Navbar = () => {
    const itemsMenu = new Menu()
    const [nav, setNav] = useState(false);
    return (
        <header className="header">
            <div className="container">
                <div className="box">
                    <div className="logo">
                        <a href="/">
                            <img src={Logo} alt='/'/>
                            <span className="logo_text">Mitch</span>
                        </a>
                    </div>
                    <ul
                        className={
                            nav ? ["menu", "active"].join(' ') : "menu"
                        }
                    >
                        {itemsMenu.menu.map(item =>
                            <li>
                                <a href={item.href}>{item.title}</a>
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