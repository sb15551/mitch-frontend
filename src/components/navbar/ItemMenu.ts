export class ItemMenu {
    private _title: string;
    private _href: string;

    constructor(title: string, href: string) {
        this._title = title;
        this._href = href;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get href(): string {
        return this._href;
    }

    set href(value: string) {
        this._href = value;
    }
}