import {OrderApi} from "../../../common/OrderApi";
import {CommonTable} from "../../table/CommonTable";
import {playerHeadersTable} from "./PlayerHeadersTable";

export const PlayersTable = () => {
    return (
        <CommonTable headers={playerHeadersTable} orderApiFunction={OrderApi.getPlayers}/>
    );
}