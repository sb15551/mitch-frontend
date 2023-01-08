import axios from "axios";
import {Config} from "./Config";
import {ISignInForm} from "../components/auth-form";
import {ApiEnum} from "./ApiEnum";
import {AuthResponse, PlayersResponseDto} from "./TypeObject";

const instance = axios.create({
    baseURL: Config.url.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const OrderApi = {
    autenticate(data: ISignInForm) {
        return instance.post<AuthResponse>(ApiEnum.AUTH, {login: data.login, password: data.password});
    },

    getPlayers(token: string, page: number, size: number) {
        return instance.get<PlayersResponseDto>(
            ApiEnum.GET_PLAYERS,
            {
                headers: {"Authorization": "Bearer " + token},
                params: {page: page, size: size}
            });
    }
}