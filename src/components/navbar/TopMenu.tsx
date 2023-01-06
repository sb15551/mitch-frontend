import React, {useState} from 'react';
import Logo from '../../static/logo.png';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {Menu} from "./Menu";
import {Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch} from "../../hooks/redux-hooks";
import {removeUser} from "../../store/slices/userSlice";
import {LocalStorageKeyEnum} from "../../common/LocalStorageKeyEnum";
import ItemMenu from "./ItemMenu";
import './TopMenu.css';

const TopMenu = () => {
    var currentURI = window.location.pathname;
    const dispatch = useAppDispatch();
    const itemsMenu = new Menu()
    const [popupMenu, setPopupMenu] = useState(false);

    const logout = () => {
        localStorage.removeItem(LocalStorageKeyEnum.USER);
        dispatch(removeUser());
        window.location.reload();
    }

    const setActivePopupMenu = () => {
        setPopupMenu(!popupMenu);
    }

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
                            popupMenu ? ["menu", "active"].join(' ') : "menu"
                        }
                    >
                        {itemsMenu.menu.map(item =>
                            <ItemMenu
                                key={item.title}
                                item={item}
                                className={currentURI === item.href ? "activeTab" : ""}
                                setPopupMenu={setActivePopupMenu}
                            />
                        )}
                        <li>
                            <LogoutIcon
                                fontSize="large"
                                onClick={logout}
                                style={{cursor: "pointer"}}
                            />
                        </li>
                    </ul>
                    <div onClick={setActivePopupMenu} className={"mobile_btn"}>
                        {popupMenu ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25}/>}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TopMenu;