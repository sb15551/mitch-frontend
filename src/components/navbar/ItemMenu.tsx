import React from 'react';
import {Link} from "react-router-dom";
import {Item} from "./Item";

export interface ItemProps {
    item: Item
    className: string
    setPopupMenu: () => void
}

const ItemMenu: React.FC<ItemProps> = ({setPopupMenu, className , item}) => {
    return (
        <li className={className}>
            <Link onClick={setPopupMenu} to={item.href}>{item.title}</Link>
        </li>
    );
}

export default ItemMenu;