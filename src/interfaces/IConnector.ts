import type { IPrice } from "./IPrices";

export interface IConnector{
    id: number,
    chargerId: number,
    ordinalNumber: number,
    connectorTypeId: number,
    qrString: string,
    price: IPrice
}