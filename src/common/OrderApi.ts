import axios from "axios";
import {Config} from "./Config";
import {ISignInForm} from "../components/auth-form";
import {ApiEnum} from "./ApiEnum";
import {AuthResponse, PlayersResponseDto} from "./TypeObject";
import {handleLogError} from "./Helpers";

const instance = axios.create({
    baseURL: Config.url.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const OrderApi = {
    async autenticate(data: ISignInForm) {
        return await instance.post<AuthResponse>(ApiEnum.AUTH, {login: data.login, password: data.password})
            .then((response) => {
                if (response.status === 200) return response.data;
                return response.data;
            })
            .catch(error => {
                return handleLogError(error);
            });
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