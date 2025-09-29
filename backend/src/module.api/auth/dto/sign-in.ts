import { Verification } from "../type/verification";


export interface signInUserDto {
    verification: Verification;
    serviceData?: string;
    email?: string;
    password?: string;
}