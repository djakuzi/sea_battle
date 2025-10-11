import { Verification } from 'src/module.api/auth/type/verification';

export class RegisterUserDto {
	login: string;
	verification: Verification;
	serviceData?: string;
	email?: string;
	password?: string;
}
