import {Base64} from "js-base64";
import {ModalMessageError} from "./TypeObject";
import {format} from "date-fns";

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
    var message: string;
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
            message = "\nНеправильный логин или пароль";
        } else {
            message = error.response.data.message;
        }
    } else {
        message = "\nЧто-то пошло не так, повтори попытку позже";
    }
    var objectError: ModalMessageError = {titleError: error.message, messageError: message};
    return objectError;
}

export const longRuFormatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: "numeric"
})

export const getTodayDate = () => {
    var today: Date = new Date();
    today.setHours(18);
    today.setMinutes(0);
    today.setSeconds(0);
    return format(today, "yyyy-MM-dd'T'HH:mm");
}