import { TypeNotification } from '../types/notification';

export interface IntrNotification {
  id: number;
  type: TypeNotification;
  text: string;
  settigsClose: {
    isBtn: boolean;
    time?: number;
  };
}
