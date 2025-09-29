
import { СustomEventPlayerChanged } from "./interface/СustomEventPlayerChanged.interface";
import { LIST_EVENT } from "./listNameEvents";

export type EventData = {
    [LIST_EVENT.authChanged]: СustomEventPlayerChanged;
};