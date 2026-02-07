import { IntrStandartConfigHook } from "@app-common/types/hook/standartConfig.interface";
import { AuthService } from "@app-network/api/client.api/services/Auth/Auth.service";
import { ResponseVerificationUser } from "@app-network/api/client.api/services/Auth/types/Response.interface";
import { SetStateAction, useEffect, useState } from "react"

interface HookMeVerification {
    verification: ResponseVerificationUser[] | null,
    setVerification: React.Dispatch<SetStateAction<ResponseVerificationUser[] | null>>,
    getVerification: () => void
}

export function useMeVerification(config?: IntrStandartConfigHook): HookMeVerification {
    const [verification, setVerification] = useState<ResponseVerificationUser[] | null>(null);

    async function getVerification() {
        try {
            const req = await AuthService.getMeVerification();
            if (req.length) {
                setVerification(req);
            } else {
                setVerification(null);
            }
        } catch (error) {
            if (error instanceof Error) {
                config?.event?.error(error.message);
            }
        }
    }

    useEffect(() => {
        getVerification();
    }, []);

    return {
        verification,
        setVerification,
        getVerification
    }
}