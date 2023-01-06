import {Item} from "./Item";
import {LinkEnum} from "../../common/LinkEnum";

export class Menu {
    private _menu: Array<Item>;

    constructor() {
        this._menu = [
            new Item("Главная", LinkEnum.MAIN),
            new Item("Турниры", LinkEnum.TOURNAMENTS),
            new Item("Моя статистика", LinkEnum.STAT),
            new Item("Настройки", LinkEnum.SETTINGS),
            new Item("Админка", LinkEnum.ADMIN)];
    }

    get menu(): Array<Item> {
        return this._menu;
    }

    set menu(value: Array<Item>) {
        this._menu = value;
    }
}