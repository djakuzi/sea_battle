import { Verification, VerificationId } from "src/module.api/auth/type/verification";


export function getVerificationId(verification: Verification): number | null {
    switch (verification) {
        case Verification.EMAIL:
            return VerificationId.EMAIL;
        case Verification.VK:
            return VerificationId.VK;
        case Verification.GOOGLE:
            return VerificationId.GOOGLE;
        case Verification.YANDEX:
            return VerificationId.YANDEX;
        case Verification.TELEGRAM:
            return VerificationId.TELEGRAM;
        default:
            return null;
    }
}

const security = {
    getVerificationId
}

export default security