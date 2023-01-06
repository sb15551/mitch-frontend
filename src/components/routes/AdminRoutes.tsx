import {useLocation} from "react-router";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import {LinkEnum} from "../../common/LinkEnum";

const AdminRoutes = () => {
    const {isAdminRole} = useAuth();
    const location = useLocation();
    return isAdminRole ? (
        <Outlet/>
    ) : (
        <Navigate to={LinkEnum.MAIN} replace state={{from: location}}/>
    );
};

export default AdminRoutes;
