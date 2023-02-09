import {useLocation} from "react-router";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import {LinkEnum} from "../../common/LinkEnum";

const ProtectedRoutes = () => {
    const {isAuth} = useAuth();
    const location = useLocation();
    return (
        isAuth ?
            <Outlet/>
            :
            <Navigate to={LinkEnum.LOGIN} replace state={{from: location}}/>
    );
};

export default ProtectedRoutes;
