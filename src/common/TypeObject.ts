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