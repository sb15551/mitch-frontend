import {Base64} from "js-base64";

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
            message = "\nInvalid login or password";
            console.log(error.response.data);
        }
    } else if (error.request) {
        message = "\nSomething went wrong, try again later";
        console.log(error.request);
    } else {
        console.log(error.message);
        message = "\nSomething went wrong, try again later";
    }
    alert(error.message + message);
    return error.message;
}