import {DataStat} from "./DataStat";

export class MetricValue {
    metricCode: string;
    metricName: string;
    metricOrder: number;
    values: Array<DataStat>;

    constructor(metricCode: string, metricName: string, metricOrder: number, values: Array<DataStat>) {
        this.metricCode = metricCode;
        this.metricName = metricName;
        this.metricOrder = metricOrder;
        this.values = values;
    }
}