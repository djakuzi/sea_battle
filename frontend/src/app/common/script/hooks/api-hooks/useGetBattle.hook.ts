
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { Warn } from "@app-common/script/utils/warn/class/warn.class";
import { EnumVariantPlayType } from "@app-core/data/list-component/interfaces/variantsPlay.interface";
import { IntrApiGetOneVsOne } from "@app-network/api/client.api/services/Battles/Friend/api-types/res.getOneVsOne.interface";
import { BattlesService } from "@app-network/api/client.api/services/Battles/Friend/Battle.service";
import { useEffect, useState } from "react";

export function useGetBattle(type: EnumVariantPlayType) {
	const [error, setError] = useState<string | null>(null);
	const [listBattles, setListBattles] = useState<IntrApiGetOneVsOne[] | null>(null);

	async function updatelistBattles():Promise<void> {
		try {
			let res: typeof listBattles = null;
			if (type == EnumVariantPlayType.ONE_VS_ONE) {
				res = await BattlesService.getOneVsONe();
			}

			if (res?.length === 0 || !res) {
				throw new Warn('Список битв пуст');
			}

			setListBattles(res);
		} catch (error) {
			if (error instanceof Warn) {
				setError(error?.message)
				devModeConsole('warn', error.message);

				return;
			}

			if (error instanceof Error) {
				setError(error?.message)
				devModeConsole('error', error.message);
			}
		}    
	}

	useEffect( () => {
		updatelistBattles();
	}, []);

	return {
		listBattles,
		error,
		updatelistBattles,
	}
}