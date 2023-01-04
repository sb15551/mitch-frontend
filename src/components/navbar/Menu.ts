import {ItemMenu} from "./ItemMenu";

export class Menu {
    private _menu: Array<ItemMenu>;

    constructor() {
        this._menu = [
            new ItemMenu("Главная", "/"),
            new ItemMenu("Турниры", "/tournaments"),
            new ItemMenu("Моя статистика", "/stat"),
            new ItemMenu("Настройки", "/settings")];
    }

    get menu(): Array<ItemMenu> {
        return this._menu;
    }

    set menu(value: Array<ItemMenu>) {
        this._menu = value;
    }
}