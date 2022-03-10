import { Gender } from "../../DataLayer/Context/User/Gender";

export interface CreateUserDto {
    name: string;
    gender: Gender;
    password: string;
    family: string;
    email: string;
}