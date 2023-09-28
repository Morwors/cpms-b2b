export interface IUser  {
    id: number,
    username: string,
    roleId: number,
    firstName: string,
    lastName: string,
    email: string,
    companyId: number,
    password: string,
    street: string,
    city: string,
    postalCode: string,
    isDeleted: number,
    role: {
        id: number,
        roleName: string
    }
}
