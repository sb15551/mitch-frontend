import {useAppSelector} from './redux-hooks';
import {LocalStorageKeyEnum} from "../common/LocalStorageKeyEnum";
import {AuthResponse} from "../common/TypeObject";
import {parseJwtPayload} from "../common/Helpers";
import {RoleCodeEnum} from "../common/RoleCodeEnum";

export function useAuth() {
    const {login, token, id, userRole} = useAppSelector(state => state.user);
    var localStorageUser = localStorage.getItem(LocalStorageKeyEnum.USER);
    var currentUser: AuthResponse = JSON.parse(localStorageUser as string);

    if (currentUser == null) {
        return {
            isAuth: !!currentUser,
            isAdminRole: !!currentUser,
            login,
            token,
            id,
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
            token: currentUser.token,
            id: currentUser.id,
            userRole: role
        };
    }
}