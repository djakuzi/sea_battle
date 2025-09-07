import { TypePlaneShip, TypeSizeShip, TypeViewShip } from '../../types/Ship.type';

export interface PropsShip {
  style: {
    width: number;
  };
  cls?: string;
  view?: TypeViewShip;
  size: TypeSizeShip;
  plane?: TypePlaneShip;
}
