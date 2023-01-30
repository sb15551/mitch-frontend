import {ColumnsSetting} from "../../common/TypeObject";
import {TournamentHeaderType} from "../../dto/TournamentObjects";

export interface SettingsTournamentHeadersTable extends ColumnsSetting {
    id: TournamentHeaderType;
}