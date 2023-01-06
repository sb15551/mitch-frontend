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
    if (error.response) {
        console.log(error.response.data);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log(error.message);
    }
}