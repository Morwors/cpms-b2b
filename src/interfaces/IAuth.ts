export interface IAuthLogin{
    email: string,
    password: string
}
export interface IAuthRegister{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    companyId: number,
    street: string,
    city: string,
    postalCode: string,
    country: string
}
