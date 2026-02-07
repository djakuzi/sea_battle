import { Controller, Get } from '@nestjs/common';
import { ServiceRole } from './services/role.service';

@Controller('role')
export class RoleController {
	constructor(private readonly ServiceRole: ServiceRole) { }

	@Get('')
	async getAll(): Promise<string> {
		const result = await this.ServiceRole.getAllRoles();

		let html = '';

		result.forEach((el) => {
			html += `
        <div>
          <p> <span>${el.id}</span> ${el.name}</p>
        </div>
      `;
		});

		return html;
	}
}
