export interface UpdateUserModel {
    userId:string;
    firstName: string;
    lastName: string;
    gender: number;
    file:any;
    exAvatarUrl?:string;
}

export enum Gender {
    Male = 1,
    Female = 2,
    Trans = 3
}