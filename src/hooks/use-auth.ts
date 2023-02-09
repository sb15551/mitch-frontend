import {useAppSelector} from './redux-hooks';
import {LocalStorageKeyEnum} from "../common/LocalStorageKeyEnum";
import {AuthResponse} from "../dto/PlayerObjects";
import {parseJwtPayload} from "../common/Helpers";
import {RoleCodeEnum} from "../common/RoleCodeEnum";

export function useAuth() {
    const {login, userRole} = useAppSelector(state => state.user);
    var localStorageUser = localStorage.getItem(LocalStorageKeyEnum.USER);
    var currentUser: AuthResponse = JSON.parse(localStorageUser as string);

    if (currentUser == null) {
        return {
            isAuth: !!currentUser,
            isAdminRole: !!currentUser,
            login,
            name: "",
            surname: "",
            token: "",
            id: 0,
            userRole
        };
    } else {
        var payload = parseJwtPayload(currentUser.token);
        var nowDate: number = Math.trunc(new Date().getTime() / 1000);
        var exp: number = payload.exp;
        var role: string = payload.role[0];

        var adminRoles: Array<string> = [RoleCodeEnum.ROOT, RoleCodeEnum.ADMIN];
        return {
            isAuth: !!currentUser && nowDate <= exp,
            isAdminRole: adminRoles.includes(role),
            login: currentUser.login,
            name: currentUser.name,
            surname: currentUser.surname,
            token: currentUser.token,
            id: currentUser.id,
            userRole: role
        };
    }
}