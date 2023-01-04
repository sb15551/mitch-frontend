import {ItemMenu} from "./ItemMenu";
import {LinkEnum} from "../../common/LinkEnum";

export class Menu {
    private _menu: Array<ItemMenu>;

    constructor() {
        this._menu = [
            new ItemMenu("Главная", LinkEnum.MAIN),
            new ItemMenu("Турниры", LinkEnum.TOURNAMENTS),
            new ItemMenu("Моя статистика", LinkEnum.STAT),
            new ItemMenu("Настройки", LinkEnum.SETTINGS)];
    }

    get menu(): Array<ItemMenu> {
        return this._menu;
    }

    set menu(value: Array<ItemMenu>) {
        this._menu = value;
    }
}