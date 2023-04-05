import {defaultLocation, LocationDto} from "./LocationObjects";
import {defaultPlayer, PlayerDto} from "./PlayerObjects";
import {StatusCodeEnum} from "../common/StatusCodeEnum";

export type TournamentResponseDto = {
    total: number,
    rows: Array<TournamentRowDto>
}

export type TournamentRowDto = {
    id: number;
    title: string;
    eventDate: string;
    status: string;
}

export type TournamentHeaderType = "title" | "countParticipants" | "eventDate" | "status";

export type TournamentDto = {
    id: number;
    title: string;
    eventDate: string;
    buyin: number;
    rebuy: number;
    addon: number;
    topPlaces: number;
    location: LocationDto;
    statusCode: string;
    isChristmas: boolean;
    participants: Array<TournamentParticipantDto>;
}

export type TournamentParticipantDto = {
    id: number;
    place: number;
    countRebuy: number;
    isAddon: boolean;
    player: PlayerDto;
    byPlayer: PlayerDto;
    status: boolean;
}

export type StatusDto = {
    name: string;
    code: string;
}

export const defaultTournament: TournamentDto = {
    id: 0,
    title: "",
    eventDate: "",
    buyin: 500,
    rebuy: 500,
    addon: 500,
    topPlaces: 3,
    location: defaultLocation,
    statusCode: StatusCodeEnum.REGISTRATION,
    isChristmas: false,
    participants: Array<TournamentParticipantDto>(),
};

export const defaultTournamentParticipant: TournamentParticipantDto = {
    id: 0,
    place: 0,
    countRebuy: 0,
    isAddon: false,
    player: defaultPlayer,
    byPlayer: defaultPlayer,
    status: true
}

export type ParticipantHeaderType = "place" | "player" | "byPlayer" | "rebuy" | "addon" | "delete";
