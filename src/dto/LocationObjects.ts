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