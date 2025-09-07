import { Verification } from "src/module.api/auth/interface/verification";

export interface signInUserDto {
    verification: Verification;
    serviceData?: string;
    email?: string;
    password?: string;
}