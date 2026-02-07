import { isErrorWithConsole } from "@app-common/script/utils/error/method/isErrorWithConsole";
import { ServiceInfo } from "@app-network/api/client.api/services/Info/Info.service";
import { useEffect, useState } from "react";

export interface IntrUseCountOnline {
    countOnline: number,
	updateOnline: () => Promise<void>
}

export default function useCountOnline() {
    const [countOnline, setCountOnline ] = useState<number>(0);

	async function updateOnline():Promise<void> {
		try {
			const request = await ServiceInfo.getCountOnlinePlayers()
			if (request.count != countOnline) {
				setCountOnline(request.count)
			}
		} catch (error) {
			isErrorWithConsole(error);
		}
	}

    useEffect(() => {
		updateOnline();
    }, [])

    return {
        countOnline,
		updateOnline
    }
}