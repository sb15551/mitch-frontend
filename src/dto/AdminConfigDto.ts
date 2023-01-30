import {StatusDto} from "./TournamentObjects";
import {Role} from "./PlayerObjects";

export type AdminConfigResponseDto = {
    roles: Array<Role>,
    statuses: Array<StatusDto>
}