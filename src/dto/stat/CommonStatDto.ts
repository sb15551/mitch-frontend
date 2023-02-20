import {DataStat} from "./DataStat";

export class CommonStatDto  {
    countGamesPlayed: number;
    firstPlaces: Array<DataStat>;
    secondPlaces: Array<DataStat>;
    thirdPlaces: Array<DataStat>;
    christmasTops: Array<DataStat>;
    bablTops: Array<DataStat>;
    knockoutTops: Array<DataStat>;

    constructor(countGamesPlayed: number, firstPlaces: Array<DataStat>, secondPlaces: Array<DataStat>, thirdPlaces: Array<DataStat>, christmasTops: Array<DataStat>, bablTops: Array<DataStat>, knockoutTops: Array<DataStat>) {
        this.countGamesPlayed = countGamesPlayed;
        this.firstPlaces = firstPlaces;
        this.secondPlaces = secondPlaces;
        this.thirdPlaces = thirdPlaces;
        this.christmasTops = christmasTops;
        this.bablTops = bablTops;
        this.knockoutTops = knockoutTops;
    }
}