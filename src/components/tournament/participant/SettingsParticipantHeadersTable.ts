import {ColumnsSetting} from "../../../common/TypeObject";
import {ParticipantHeaderType} from "../../../dto/TournamentObjects";

export interface SettingsParticipantsHeadersTable extends ColumnsSetting {
    id: ParticipantHeaderType;
    forStatus: Array<string>
}