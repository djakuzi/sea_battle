export class VerificationUserDto {
    verification_id: number;
    user_id: number;
    service_data: string | null;
    password: string | null;
    email: string | null;
}