import { Verification } from "./Verification";

export interface IntrRegister {
    login: string;
    verification: Verification;
    serviceData?: string;
    email?: string;
    password?: string;
}