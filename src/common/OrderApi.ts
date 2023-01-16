import axios from "axios";
import {Config} from "./Config";
import {ISignInForm} from "../components/auth-form";
import {ApiEnum} from "./ApiEnum";
import {AuthResponse, LocationDto, LocationsResponseDto, PlayerDto, PlayersResponseDto} from "./TypeObject";

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
}