import { CONFIG_FIELD } from '../../../core/settings/fieldCoord.settings';
import { IntrCoord, IntrFullCoordPuttingShip } from '../../types/Ship.interface';
import { TypePlaneShip } from '../../types/Ship.type';

export function getElementCoord(coord: IntrCoord, fieldCoord: HTMLDivElement, numX = 0, numY = 0): HTMLDivElement | null {
  const { x, y } = coord;
  const elCoord = fieldCoord.querySelector<HTMLDivElement>(`[data-coord-x="${x + numX}"][data-coord-y="${y + numY}"]`);

  return elCoord;
}

export function setPerimeter(plane: TypePlaneShip, coords: IntrCoord[], fieldCoord: HTMLDivElement): void {
  const { perimeter: classPerimeter } = CONFIG_FIELD.classesCoord;
  const { miss: classMiss } = CONFIG_FIELD.classesCoord;
  const isHorizontal = plane == 'horizontal';

  function addPerimeter(elCoord: HTMLDivElement | null): void {
    if (!elCoord) return;

    elCoord.classList.remove(classMiss);
    elCoord.classList.add(classPerimeter);
  }

  type TypeElCoord = HTMLDivElement | null;

  coords.forEach((coord: IntrCoord, index: number, arr) => {
    const mainCoord = getElementCoord(coord, fieldCoord);

    const isBow = index === 0;
    const isStern = index === arr.length - 1;

    let coordCenterBow: TypeElCoord = null;
    let coordLeftBow: TypeElCoord = null;
    let coordRightBow: TypeElCoord = null;

    let coordCenterStern: TypeElCoord = null;
    let coordLeftStern: TypeElCoord = null;
    let coordRightStern: TypeElCoord = null;

    let leftBoard: TypeElCoord = null;
    let rightBoard: TypeElCoord = null;

    if (isHorizontal) {
      leftBoard = getElementCoord(coord, fieldCoord, 0, -1);
      rightBoard = getElementCoord(coord, fieldCoord, 0, 1);

      if (isBow) {
        coordCenterBow = getElementCoord(coord, fieldCoord, -1, 0);
        coordLeftBow = getElementCoord(coord, fieldCoord, -1, 1);
        coordRightBow = getElementCoord(coord, fieldCoord, -1, -1);
      }

      if (isStern) {
        coordCenterStern = getElementCoord(coord, fieldCoord, 1, 0);
        coordLeftStern = getElementCoord(coord, fieldCoord, 1, 1);
        coordRightStern = getElementCoord(coord, fieldCoord, 1, -1);
      }
    } else {
      leftBoard = getElementCoord(coord, fieldCoord, -1, 0);
      rightBoard = getElementCoord(coord, fieldCoord, 1, 0);

      if (isBow) {
        coordCenterBow = getElementCoord(coord, fieldCoord, 0, -1);
        coordLeftBow = getElementCoord(coord, fieldCoord, -1, -1);
        coordRightBow = getElementCoord(coord, fieldCoord, 1, -1);
      }

      if (isStern) {
        coordCenterStern = getElementCoord(coord, fieldCoord, 0, 1);
        coordLeftStern = getElementCoord(coord, fieldCoord, -1, 1);
        coordRightStern = getElementCoord(coord, fieldCoord, 1, 1);
      }
    }

    addPerimeter(mainCoord);
    addPerimeter(leftBoard);
    addPerimeter(rightBoard);
    addPerimeter(coordCenterBow);
    addPerimeter(coordLeftBow);
    addPerimeter(coordRightBow);
    addPerimeter(coordCenterStern);
    addPerimeter(coordLeftStern);
    addPerimeter(coordRightStern);
  });
}

export function setKill(coords: IntrCoord[], fieldCoord: HTMLDivElement): void {
  const { kill: classKill } = CONFIG_FIELD.classesCoord;
  const { hit: classHit } = CONFIG_FIELD.classesCoord;

  coords.forEach((coord: IntrCoord) => {
    const elCoord = getElementCoord(coord, fieldCoord);

    if (!elCoord) return;

    elCoord.classList.remove(classHit);
    elCoord.classList.add(classKill);
  });
}

export function setMiss(coord: IntrCoord, fieldCoord: HTMLDivElement): void {
  const { miss: classMiss } = CONFIG_FIELD.classesCoord;
  const elCoord = getElementCoord(coord, fieldCoord);

  if (!elCoord) {
    return;
  }

  elCoord.classList.add(classMiss);
}

export function setHit(coord: IntrCoord, fieldCoord: HTMLDivElement): void {
  const { hit: classHit } = CONFIG_FIELD.classesCoord;
  const elCoord = getElementCoord(coord, fieldCoord);

  if (!elCoord) {
    return;
  }

  elCoord.classList.add(classHit);
}

export function showShip(dataShip: IntrFullCoordPuttingShip, fieldCoord: HTMLDivElement): void {
  const port = fieldCoord.querySelector<HTMLDivElement>('[data-port]');
  const { plane, size } = dataShip.ship;
  const coords = dataShip.coords;
  const ship = port?.querySelector<HTMLDivElement>(`[data-ship-size="${size}"]`);
  const elCoord = getElementCoord(coords[0], fieldCoord);

  if (!ship || !elCoord) {
    console.error('Ship or coord not founded');
    return;
  }

  const { offsetTop, offsetLeft } = elCoord;

  ship.style.position = 'absolute';
  ship.style.top = offsetTop + 'px';
  ship.style.left = offsetLeft + 'px';

  ship.dataset.plane = plane;
  fieldCoord?.appendChild(ship);
}

export const mthdsCoords = {
  setMiss,
  setHit,
  setPerimeter,
  getElementCoord,
  setKill,
  showShip,
};
