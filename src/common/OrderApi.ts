import axios from "axios";
import {Config} from "./Config";
import {ISignInForm} from "../components/auth-form";
import {ApiEnum} from "./ApiEnum";
import {AuthResponse} from "./TypeObject";
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
                return null;
            })
            .catch(error => {
                handleLogError(error);
                var message: string = "";
                if (error.response.status === 401 || error.response.status === 403) {
                    message = "Invalid login or password";
                    console.log(message);
                }
                return message;
            });
    }
}