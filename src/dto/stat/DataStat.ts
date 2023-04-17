export class DataStat {
    id: number;
    name: string;
    surname: string;
    countTop: number;

    constructor(id: number, name: string, surname: string, countTop: number) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.countTop = countTop;
    }
}