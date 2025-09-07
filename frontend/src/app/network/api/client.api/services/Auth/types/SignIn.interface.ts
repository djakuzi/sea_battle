import { Verification } from "./Verification";

export interface IntrSignIn {
    verification: Verification;
    serviceData?: string;
    email?: string;
    password?: string;
}