import { UsersRepository } from '../repositories/users.repository';
import { StrategyAvailability } from '../strategies/check/availability';
import { StrategyDefault } from '../strategies/create/default.strategy';
import { StrategyMe } from '../strategies/find/me.strategy';
import { StrategyMore } from '../strategies/find/more.strategy';
import { StrategyOne } from '../strategies/find/one.strategy';
import StrategyFullFields from '../strategies/update/fullFields.strategy';
import { ServiceUserCheck } from './userCheck.service';
import { ServiceCreateUser } from './userCreate.service';
import { ServiceUserFind } from './userFind.service';

export const SCHEMA_SERVICE_USER = {
	repo: [UsersRepository],
	service: [ServiceUserFind, ServiceUserCheck, ServiceCreateUser],
	strategy: {
		find: [StrategyOne, StrategyMore, StrategyMe],
		update: [StrategyFullFields],
		create: [StrategyDefault],
		check: [StrategyAvailability],
	},
};
