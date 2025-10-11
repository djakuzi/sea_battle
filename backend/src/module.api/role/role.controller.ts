import { Controller, Get } from '@nestjs/common';
import { RoleService } from './services/role.service';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Get('')
	async getAll(): Promise<string> {
		const result = await this.roleService.getAllRoles();

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
