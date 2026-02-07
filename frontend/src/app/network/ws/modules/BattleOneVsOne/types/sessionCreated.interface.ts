import { IntrFullDataShipBattle } from "@app-common/types/Ship.interface";
import { IntrOnWebsocket } from "@app-network/ws/types/onWebsocket.interface";

export interface IntrEventSessionCreated {
	idSession: string;
}

export interface IntrOnSessionCreated extends IntrOnWebsocket {
	ships: IntrFullDataShipBattle[],
}