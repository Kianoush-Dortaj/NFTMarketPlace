
export interface GetAllUserFilter {
    blocked: boolean,
    emailConfirmed: boolean,
    isActive: boolean,
    isDeleted: boolean,
    personalVerified: boolean,
    phoneNumberConfirmed: boolean,
    phoneNumber: string
}