import React from 'react';
import {Link} from "react-router-dom";
import {Item} from "./Item";
import {useAuth} from "../../hooks/use-auth";
import {LinkEnum} from "../../common/LinkEnum";

export interface ItemProps {
    item: Item
    className: string
    setPopupMenu: () => void
}

const ItemMenu: React.FC<ItemProps> = ({setPopupMenu, className , item}) => {
    const {isAdminRole} = useAuth();

    if (item.href === LinkEnum.ADMIN) {
        if (isAdminRole) {
            return (
                <li className={className}>
                    <Link onClick={setPopupMenu} to={item.href}>{item.title}</Link>
                </li>
            );
        } else {
            return (
                <></>
            );
        }
    } else {
        return (
            <li className={className}>
                <Link onClick={setPopupMenu} to={item.href}>{item.title}</Link>
            </li>
        );
    }


}

export default ItemMenu;