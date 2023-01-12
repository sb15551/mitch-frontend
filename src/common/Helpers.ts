import {Base64} from "js-base64";
import {ModalMessageError} from "./TypeObject";

interface MyToken {
    sub: string;
    role: Array<string>
    iat: number
    exp: number;
}

export const parseJwtPayload = (token: string) => {
    var payload: string = Base64.decode(token.split(".")[1]);
    var payloadJSON: MyToken = JSON.parse(payload);
    return payloadJSON;
}

export const handleLogError = (error: any) => {
    var message: string = "";
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
            message = "\nНеправильный логин или пароль";
            console.log(error.response.data);
        }
    } else if (error.request) {
        message = "\nЧто-то пошло не так, повтори попытку позже";
        console.log(error.request);
    } else {
        console.log(error.message);
        message = "\nЧто-то пошло не так, повтори попытку позже";
    }
    var objectError: ModalMessageError = {titleError: error.message, messageError: message};
    return objectError;
}