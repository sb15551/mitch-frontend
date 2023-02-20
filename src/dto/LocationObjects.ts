export type LocationsResponseDto = {
    total: number,
    rows: Array<LocationDto>
}

export type LocationDto = {
    id: number;
    name: string;
    address: string;
}

export type LocationHeaderType = "name" | "address";

export const defaultLocation: LocationDto = {
    id: 0,
    name: "",
    address: ""
}