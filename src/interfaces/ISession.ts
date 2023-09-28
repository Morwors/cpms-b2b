import type { IUser } from "./IUser"
export interface ISessionStop {
    transactionId: string,
    chargerId: string
}
export interface ISessionStart {
    transactionId: number,
    connectorId: number,
    idTag: string,
    idTagInfo: string,
    meterStart: number,
    userId: number
}
export interface ISessionActive {
    id: number,
    transactionId: string,
    duration?: string,
    connectorId: number,
    idTag: string,
    idTagInfo: string,
    meterStart: number,
    timeStartConverted?: string,
    timeStart: string,
    meterStop: number,
    timeStop: Date,
    stopReason: string,
    userId: number,
    batteryCurveJson: IBatteryCurve[];
    powerCurveJson: IPowerCurve[];
    avgPower?: number,
    chargerId: number,
    electricityConsumed?: number,
    connector: {
        id: number,
        chargerId: number,
        ordinalNumber: number,
        connectorTypeId: number,
        qrString: string,
        charger: {
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
            company: {
                id: number,
                companyName: string,
                supportEmail: string,
                bankAccountId: number,
                street: string,
                city: string,
                postalNo: string,
                isDeleted: number,
                bankAccount: {
                    id: number,
                    receiverName: string,
                    iban: string,
                    bankName: string,
                    address: string,
                    country: string,
                    swifTcode: string,
                    currencyId: number,
                    currency: {
                        id: number,
                        currencyId: number,
                        currencyFullNameLocal: string,
                        currencyFullNameInt: string
                    }
                }
            }
        }
    },
    user: IUser,
}
export interface ISessionHistory{
    id: number;
    transactionId: number;
    connectorId: number;
    idTag: string;
    idTagInfo: string;
    duration?: string;
    meterStart: number;
    timeStart: string;
    timeStartConverted?: string,
    meterStop: number;
    timeStop: string;
    timeStopConverted?: string,
    stopReason: string;
    userId: number;
    chargerId: number;
    batteryCurveJson: IBatteryCurve[];
    powerCurveJson: IPowerCurve[];
    user: IUser;

}