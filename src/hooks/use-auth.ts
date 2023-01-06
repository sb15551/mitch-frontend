import {useAppSelector} from './redux-hooks';
import {LocalStorageKeyEnum} from "../common/LocalStorageKeyEnum";
import {AuthResponse} from "../common/TypeObject";
import {parseJwtPayload} from "../common/Helpers";

export function useAuth() {
    const {login, token, id} = useAppSelector(state => state.user);
    var localStorageUser = localStorage.getItem(LocalStorageKeyEnum.USER);
    var currentUser: AuthResponse = JSON.parse(localStorageUser as string);

    if (currentUser == null) {
        return {
            isAuth: !!currentUser,
            login,
            token,
            id
        };
    } else {
        var payload = parseJwtPayload(currentUser.token);
        var nowDate = Math.trunc(new Date().getTime() / 1000);
        var exp = payload.exp;
        return {
            isAuth: !!currentUser && nowDate <= exp,
            login: currentUser.login,
            token: currentUser.token,
            id: currentUser.id
        };
    }
}