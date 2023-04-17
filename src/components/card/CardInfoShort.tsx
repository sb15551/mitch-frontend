import {DataStat} from "../../dto/stat/DataStat";
import {FC} from "react";
import {handleLogError} from "../../common/Helpers";
import {OrderApi} from "../../common/OrderApi";
import {setObjectError} from "../../store/slices/errorSlice";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setObjectStat} from "../../store/slices/statSlice";
import {CardInfo} from "./CardInfo";

interface CardInfoProps {
    data: Array<DataStat>;
    title: string;
    code: string;
}

export const CardInfoShort: FC<CardInfoProps> = ({data, title, code}) => {
    const {token} = useAuth();
    const dispatch = useAppDispatch();

    const onClickCard = (code: string) => {
        OrderApi.getStatByCode(token, code)
            .then(response => {
                dispatch(setObjectStat(response.data));
            })
            .catch(error => {
                dispatch(setObjectError(handleLogError(error)));
            });
    }

    return (
        <CardInfo onClickCard={() => onClickCard(code)} data={data} title={title}/>
    )
}