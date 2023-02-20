export class DataStat {
    playerId: number;
    name: string;
    surname: string;
    countTop: number;
    place: number;

    constructor(playerId: number, name: string, surname: string, countTop: number, place: number) {
        this.playerId = playerId;
        this.name = name;
        this.surname = surname;
        this.countTop = countTop;
        this.place = place;
    }
}