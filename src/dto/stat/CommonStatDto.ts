import {MetricValue} from "./MetricValue";

export class CommonStatDto  {
    countGamesPlayed: number;
    metricsValues: Array<MetricValue>;

    constructor(countGamesPlayed: number, metricsValues: Array<MetricValue>) {
        this.countGamesPlayed = countGamesPlayed;
        this.metricsValues = metricsValues;
    }
}