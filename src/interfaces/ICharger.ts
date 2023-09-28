import type {IConnector} from "./IConnector";

export interface IChargerAdd{
    chargerIdentificator: string,
    companyId: number,
    longitude: number,
    latitude: number,
    description: string,
    street: string,
    city: string,
    postalNumber: string,
    country: string,
    model: string,
    vendor: string,
    firmwareVersion: string,
    // isDeleted: number
}
export interface ICharger
{
    id: number,
    chargerIdentificator: string,
    companyId: number,
    longitude: number,
    latitude: number,
    description: string,
    street: string,
    city: string,
    postalNumber: string,
    country: string,
    model: string,
    vendor: string,
    firmwareVersion: string,
    isDeleted: number,
    company: any,
    connectors: IConnector[],
    address?: string,
    location?: string,
    connectorNumbers?: number
    status?: number;
    qr?: string;
}
