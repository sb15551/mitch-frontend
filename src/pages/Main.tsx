import {useAuth} from "../hooks/use-auth";
import TopMenu from "../components/navbar/TopMenu";
import React from "react";
import {parseJwtPayload} from "../common/Helpers"

const Main = () => {
    const {login, token} = useAuth();
    var payload = parseJwtPayload(token as string);
    var nowDate = Math.trunc(new Date().getTime() / 1000);
    var exp = payload.exp;
    return (
        <>
            <TopMenu/>
            <div className="content">
                <h1>Welcome, {login}</h1>
                <h1>{nowDate}</h1>
                <h1>{exp}</h1>
                <h1>{(nowDate <= exp) + ""}</h1>
            </div>
        </>
    );
}

export default Main;