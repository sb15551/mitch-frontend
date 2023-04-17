import axios from "axios";
import {Config} from "./Config";
import {ISignInForm} from "../components/auth-form";
import {ApiEnum} from "./ApiEnum";
import {AuthResponse, PlayerDto, PlayersResponseDto} from "../dto/PlayerObjects";
import {LocationDto, LocationsResponseDto} from "../dto/LocationObjects";
import {TournamentDto, TournamentResponseDto} from "../dto/TournamentObjects";
import {AdminConfigResponseDto} from "../dto/AdminConfigDto";
import {MetricValue} from "../dto/stat/MetricValue";

const instance = axios.create({
    baseURL: Config.url.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const OrderApi = {
    autenticate(data: ISignInForm) {
        return instance.post<AuthResponse>(
            ApiEnum.AUTH,
            {login: data.login, password: data.password});
    },

    getPlayers(token: string, page: number, size: number) {
        return instance.get<PlayersResponseDto>(
            ApiEnum.GET_PLAYERS,
            {
                headers: {"Authorization": "Bearer " + token},
                params: {page: page, size: size}
            });
    },

    getAllPlayers(token: string) {
        return instance.get<Array<PlayerDto>>(
            ApiEnum.GET_ALL_PLAYERS,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    getPlayer(token: string, playerId: number) {
        return instance.get<PlayerDto>(
            ApiEnum.GET_PLAYER + "/" + playerId,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    savePlayer(token: string, player: any) {
        return instance.post(
            ApiEnum.GET_PLAYER,
            player,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    savePlayerSettings(token: string, settings: any) {
        return instance.post(
            ApiEnum.GET_PLAYER_SETTINGS,
            settings,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    getLocations(token: string, page: number, size: number) {
        return instance.get<LocationsResponseDto>(
            ApiEnum.GET_LOCATIONS,
            {
                headers: {"Authorization": "Bearer " + token},
                params: {page: page, size: size}
            });
    },

    getLocation(token: string, locationId: number) {
        return instance.get<LocationDto>(
            ApiEnum.GET_LOCATION + "/" + locationId,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    saveLocation(token: string, location: any) {
        return instance.post(
            ApiEnum.UPSERT_LOCATION,
            location,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    getTournaments(token: string, page: number, size: number) {
        return instance.get<TournamentResponseDto>(
            ApiEnum.GET_TOURNAMENTS,
            {
                headers: {"Authorization": "Bearer " + token},
                params: {page: page, size: size}
            });
    },

    getTournament(token: string, tournamentId: number) {
        return instance.get<TournamentDto>(
            ApiEnum.GET_TOURNAMENT + "/" + tournamentId,
            {
                headers: {"Authorization": "Bearer " + token}
            });
    },

    getAdminConfig(token: string) {
        return instance.get<AdminConfigResponseDto>(
            ApiEnum.GET_ADMIN_CONFIG,
            {
                headers: {"Authorization": "Bearer " + token}
            });
    },

    generateTitle(token: string) {
        return instance.get<string>(
            ApiEnum.GET_RANDOM_TITLE,
            {
                headers: {"Authorization": "Bearer " + token}
            });
    },

    saveTournament(token: string, tournament: any) {
        return instance.post(
            ApiEnum.UPSERT_TOURNAMENT,
            tournament,
            {
                headers: {"Authorization": "Bearer " + token},
            });
    },

    registerForTournament(token: string, data: any) {
        return instance.post(
            ApiEnum.REGISTER_FOR,
            data,
            {
                headers: {"Authorization": "Bearer " + token}
            });
    },

    getCommonStat(token: string) {
        return instance.get(
            ApiEnum.GET_COMMON_STAT,
            {
                headers: {"Authorization": "Bearer " + token}
            });
    },

    getStatByCode(token: string, code: string) {
        return instance.get<MetricValue>(
            ApiEnum.GET_STAT,
            {
                headers: {"Authorization": "Bearer " + token},
                params: {metricCode: code}
            });
    },
}