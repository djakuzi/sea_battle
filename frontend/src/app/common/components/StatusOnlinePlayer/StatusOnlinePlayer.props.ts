import { IntrStatusNetworkPlayer } from "../../types/Player.interface";


export interface PropsStatusOnlinePlayer {
  cls?: string;
  type?: 'getStatus' | 'insertStatus';
  idPlayer: number;
  statusNetwork?: IntrStatusNetworkPlayer | null;
}
