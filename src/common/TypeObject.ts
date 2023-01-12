import {RoleCodeEnum} from "./RoleCodeEnum";

export type AuthResponse = {
    id: number,
    login: string,
    token: string
}

export type Role = {
    name: string;
    code: string;
}

export type PlayersResponseDto = {
    total: number,
    rows: Array<PlayersResponseDataDto>
}

export type PlayersResponseDataDto = {
    id: number;
    fullName: string;
    role: Role;
    telegramId: string;
    telegramChatId: number;
}

export type PlayerDto = {
    id: number;
    login: string;
    name: string;
    surname: string;
    role: Role;
    chatId: number;
    createdDate: string;
}

export const defaultPlayer: PlayerDto = {
    id: 0,
    login: "",
    name: "",
    surname: "",
    role: {name: "", code: RoleCodeEnum.PLAYER},
    chatId: 0,
    createdDate: "",
};

export type PlayerHeaderType = "fullName" | "role" | "telegramId" | "telegramChatId";
export type TournamentHeaders = "title" | "buyin" | "addon" | "startDate";

export interface ColumnsSetting {
    id: any;
    title: string;
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    minWidth: number;
}

export type ModalMessageError = {
    titleError: string;
    messageError: string;
}