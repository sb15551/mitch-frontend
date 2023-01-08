export type AuthResponse = {
    id: number,
    login: string,
    token: string
}

export type PlayersResponseDto = {
    total: number,
    rows: Array<PlayersResponseDataDto>
}

export interface PlayersResponseDataDto {
    id: number;
    fullName: string;
    role: string;
    telegramId: string;
    telegramChatId: number;
}

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