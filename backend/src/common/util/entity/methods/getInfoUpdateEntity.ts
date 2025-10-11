import { ResultUpdateEntity } from 'src/common/interface/ResultUpdateEntity.interface';
import { UpdateResult } from 'typeorm';

export function getInfoUpdateEntity(result: UpdateResult): ResultUpdateEntity {
	const { affected } = result;
	const isUpdate = affected !== 0;
	const message = result
		? 'Количество обновленных полей: ' + affected
		: 'Произошла ошибка при обновлении';

	return {
		isUpdate,
		message,
		result,
	};
}
