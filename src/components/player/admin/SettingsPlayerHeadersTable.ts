import {ColumnsSetting} from "../../../common/TypeObject";
import {PlayerHeaderType} from "../../../dto/PlayerObjects";

export interface SettingsPlayerHeadersTable extends ColumnsSetting {
    id: PlayerHeaderType;
}