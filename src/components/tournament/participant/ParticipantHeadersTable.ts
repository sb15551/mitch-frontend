import {SettingsParticipantsHeadersTable} from "./SettingsParticipantHeadersTable";
import {StatusCodeEnum} from "../../../common/StatusCodeEnum";

export const participantHeadersTable: SettingsParticipantsHeadersTable[] = [
    {id: "place", title: "Место", align: "center", width: 50, forStatus: [StatusCodeEnum.INPROGRESS, StatusCodeEnum.FINISHED]},
    {id: "player", title: "Полное имя", align: "left", minWidth: 150, forStatus: [StatusCodeEnum.REGISTRATION, StatusCodeEnum.INPROGRESS, StatusCodeEnum.FINISHED]},
    {id: "byPlayer", title: "Кто обезглавил", align: "left", minWidth: 150, forStatus: [StatusCodeEnum.INPROGRESS, StatusCodeEnum.FINISHED]},
    {id: "rebuy", title: "Ребаи", align: "center", minWidth: 120, width: 120, forStatus: [StatusCodeEnum.INPROGRESS, StatusCodeEnum.FINISHED]},
    {id: "addon", title: "Аддон", align: "center", width: 100, forStatus: [StatusCodeEnum.INPROGRESS, StatusCodeEnum.FINISHED]},
]