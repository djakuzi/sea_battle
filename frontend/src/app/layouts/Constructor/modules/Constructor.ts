import { IntrCoord, IntrCoordPuttingShip, IntrFullDataShipBattle } from '../../../common/types/Ship.interface';
import { actionsConstructor } from '../../../redux/slice/constructor/constructor.slice';
import store, { RootState } from '../../../redux/store';
import { TypePlaneShip, TypeSizeShip } from '../../../common/types/Ship.type';
import { Bot } from '../../Battle/modules/bot';
import { getElementCoord } from '../../../common/script/modules/fieldCoord.module';
import { transformationToFullCoordShips } from '../../../common/script/modules/ship.module';
import { CONFIG_FIELD } from '../../../core/settings/fieldCoord.settings';

interface IntrObjPortShip {
  index: number;
  port: HTMLDivElement;
  parentShip: HTMLDivElement;
}

interface IntrParamsShip {
  parentShip?: HTMLDivElement;
  portShip?: HTMLDivElement;
  plane: TypePlaneShip;
  index: number;
  size: number;
  coords?: IntrCoord[];
  widthParentShip: number;
  heightParentShip: number;
}

interface IntrObjParamsShip extends IntrParamsShip {
  shiftX: number;
  shiftY: number;
}

/**
 * @class - отвечает за расстановку кораблей на поле
 * -----
 * @constructor принимает следующие значения:
 * @param {HTMLDivElement} field - поле, куда ставятся корабли;
 * @param {string} style - класс, который будет применяться к коодинате поля в случае, если корабль находится прям под ним.
 *
 * -----
 * @property {string} nameClass - название класса;
 * @property {object} objError - объект ошибок;
 * @property {object} objWarn - объект предупреждений;
 * @property {IntrfStyle} style - класс модификаторы коодинат
 * @property {HTMLDivElement} field - поле, куда ставятся корабли;
 * @property {DOMRect} coordFiled - координаты поля;
 * @property {NodeListOf<HTMLDivElement>} arrShip - массив кораблей;
 * @property {NodeListOf<HTMLDivElement>} arrFieldRect - массив квадратов поля;
 * @property {IntrObjPortShip[]} arrObjPotShip - массив объектов, которые содержат корабли принадлежащие порту;
 * @property {IntrObjParamsShip} currentParamsShip - объект, который содержит в себе характеристика о корабле, который перемещают
 * @property {IntrCoordPuttingShip[]} _arrCoordSettingShip - массив объектов, которые данные о корбалях, поставленных на поле;
 *
 * Доступные методы:
 * --
 * @method init - инициализация работы класса;
 * @method unInit - остановить работу класса;
 * @method arrCoordPuttingShip - возвращает массив данных о расположении кораблей на поле (readonly);
 * @method resetPositionShips - возвращает корабли на свои изначальные места;
 * @method deleteShipsByWindow - удаляет корабли с экрана.
 */
export class ConstructorMoveShip {
  nameClass: string = 'MoveShip';
  protected getState = (): RootState => store.getState();
  protected dispatch = store.dispatch;

  objError = {
    notFinedShip: `${this.nameClass}: Ships not fined`,
    notFinedShipInCurrentObj: `${this.nameClass}: Ship not found in current ship drag parameters object`,
    failedLinkPortShip: `${this.nameClass}: Failed to linked ship with port`,
    failedFinedHighLightBlock: `${this.nameClass}: Failed to secure ship over field because first allocated block was not found`,
  };
  objWarn = {
    perimeterAnotherShip: `${this.nameClass}: Perimeter of another ship`,
    notFoundCoordForPerimeter: `${this.nameClass}: Coordinate not found for perimeter`,
  };

  //params
  protected style = CONFIG_FIELD.classesCoord;
  protected field: HTMLDivElement;
  protected elConstructor: HTMLDivElement;
  protected coordFiled!: DOMRect;
  protected arrShip!: NodeListOf<HTMLDivElement>;
  protected arrFieldRect!: NodeListOf<HTMLDivElement>;
  protected arrCoordFieldRect!: DOMRect[];
  protected arrObjPotShip: IntrObjPortShip[] = [];
  protected currentParamsShip: IntrObjParamsShip = {
    widthParentShip: 0,
    heightParentShip: 0,
    shiftX: 0,
    shiftY: 0,
    plane: 'horizontal',
    size: 0,
    index: 0,
  };
  protected _arrCoordPuttingShip: IntrCoordPuttingShip[] = [];

  //params for dblClick
  protected clickCount: 0 | 1 | 2 = 0;
  protected lastClickTime: number = 0;

  constructor(field: HTMLDivElement, elConstructor: HTMLDivElement) {
    this.field = field;
    this.elConstructor = elConstructor;
  }

  //#Methods for use outside
  /**
   * @method init - инициализация работы класса
   */
  init = (): void => {
    this.coordFiled = this.field.getBoundingClientRect();
    this.arrShip = document.querySelectorAll('[data-ship]');
    this.arrFieldRect = this.field.querySelectorAll('[data-coord-x]');
    this.arrCoordFieldRect = [...this.arrFieldRect].map((rect): DOMRect => rect.getBoundingClientRect());

    if (this.arrShip.length === 0 || this.arrFieldRect.length === 0) {
      throw new Error(this.objError.notFinedShip);
    }

    this.arrShip.forEach((ship) => {
      ship.addEventListener('mousedown', this.takeShip as (event: Event) => void);
      (ship as HTMLDivElement).ondragstart = function (): boolean {
        return false;
      };
    });
  };
  /**
   * @method unInit
   * - остановить/удалить все обработчики событий
   * - удалить оставшиеся корабли, если они оказались вне react компонента,
   * так как при добавлении корабля на поле, они добавляются в body.
   */
  unInit = (): void => {
    if (this.arrShip.length === 0 || this.arrFieldRect.length === 0) throw new Error(this.objError.notFinedShip);

    this.arrShip.forEach((ship) => {
      ship.removeEventListener('mousedown', this.takeShip as (event: Event) => void);
      ship.removeEventListener('mouseup', this.checkPosition as (event: Event) => void);
      (ship as HTMLDivElement).ondragstart = function (): boolean {
        return true;
      };
    });
    document.removeEventListener('mousemove', this.moveCursor);
  };
  /**
   * @method arrCoordPuttingShip - возвращает массив данных о рассположении кораблей на поле (readonly)
   */
  get arrCoordPuttingShip(): IntrCoordPuttingShip[] {
    return this._arrCoordPuttingShip;
  }
  /**
   * @method deleteShipsByWindow - удаляет корабли с экрана
   */
  deleteShipsByWindow = (): void => {
    this.arrShip.forEach((ship) => {
      ship.remove();
    });
  };
  // /#Methods for use outside

  //#Handelrs
  /**
   * @method takeShip - обработчик события, когда корабль взяли.
   */
  protected takeShip = (event: MouseEvent): void => {
    try {
      event.preventDefault();

      const parentShip = (event.target as HTMLDivElement).closest('[data-ship]') as HTMLDivElement;
      const planeShip = parentShip.getAttribute('data-plane') as TypePlaneShip;
      let portShip = parentShip.closest('[data-port-ship]') as HTMLDivElement;
      const isPutting = parentShip.dataset.putting;

      //если корабль был взят с поля боя, то определим его порт
      if (!portShip) {
        portShip = document.querySelector(`[data-port-ship][data-index='${parentShip.dataset.index}']`) as HTMLDivElement;
      }

      const index = this.setIndexPortShip(parentShip, portShip);
      if (!index && index != 0) throw new Error(this.objError.failedLinkPortShip + ', because index = ' + index);

      this.currentParamsShip = {
        parentShip,
        portShip,
        index,
        plane: planeShip,
        size: +parentShip.dataset.shipSize!,
        widthParentShip: parentShip.offsetWidth,
        heightParentShip: parentShip.offsetHeight,
        shiftX: event.clientX - parentShip.getBoundingClientRect().left,
        shiftY: event.clientY - parentShip.getBoundingClientRect().top,
      };

      //если корабль находится на поле, то проверяем был ли дабл клик,
      //если он был, то меняется положение корабля
      if (isPutting == 'true') {
        this.checkDblClick(this.changePlane);
        // return;
      }

      parentShip.style.position = 'absolute';
      parentShip.style.zIndex = '1000';

      this.elConstructor.appendChild(parentShip);
      this.currentCord(event.clientX, event.clientY);

      document.addEventListener('mousemove', this.moveCursor);
      parentShip.addEventListener('mouseup', this.checkPosition);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   * @method moveCursor - обработчик события, когда корабли начали перетаскивать
   */
  protected moveCursor = (event: MouseEvent): void => {
    event.preventDefault();

    this.currentCord(event.clientX, event.clientY);
    //проверка, находится ли корабли в области поля
    if (!this.isCheckAreaShip()) {
      this.resetHighlightCoord();
      return;
    }

    this.toggleHighlightShipCoord();
  };
  /**
   * @method checkPosition - обработчик события, когда корабль отпускают.
   * Если корабль находится в зоне поля, то он добавлятся на поле, если нет,
   * то он добавляется обратно в свое изначальное место, то есть в порт.
   */
  protected checkPosition = (event: MouseEvent): void => {
    try {
      event.preventDefault();
      //проверка, находится ли корабли в области поля
      const test = this.isCheckAreaShip();

      if (test) {
        this.putShip();
      } else {
        this.returnShip();
      }
    } catch (e) {
      console.error(e);
    }
  };
  // /#Handelrs

  //#Methods for Handelrs
  /**
   * @method currentCord - опреляется координаты корабля
   * относильно координат мыши или зажатого тача
   */
  protected currentCord = (corX: number, corY: number): void => {
    const parentShip = this.currentParamsShip.parentShip as HTMLDivElement;
    const coordX = corX - this.currentParamsShip.shiftX;
    const coordY = corY - this.currentParamsShip.shiftY;

    parentShip.style.left = coordX + 'px';
    parentShip.style.top = coordY + 'px';
  };
  /**
   * @method putShip - метод, который ставит корабль на те координаты,
   * над которымы он находится
   */
  protected putShip = (paramsShip?: IntrParamsShip): void => {
    try {
      const { parentShip, size, plane } = paramsShip ? paramsShip : this.currentParamsShip;
      let arrCoordsShip: (HTMLDivElement | null)[] = [];

      if (paramsShip && paramsShip.coords) {
        arrCoordsShip = paramsShip.coords.map((coord) => getElementCoord(coord, this.field));
      } else {
        arrCoordsShip = [...this.arrFieldRect].filter((el) => el.classList.contains(this.style.highlight));
      }

      const firstBlockHighlight = arrCoordsShip[0] as HTMLDivElement;
      const lastBlockHighlight = arrCoordsShip[arrCoordsShip.length - 1];
      const { offsetTop, offsetLeft } = firstBlockHighlight;

      if (!parentShip) {
        throw new Error(this.objError.notFinedShipInCurrentObj);
      }

      if (arrCoordsShip.length != size) {
        this.returnShip();
        console.warn(this.objWarn.perimeterAnotherShip);
        return;
      }

      if (!firstBlockHighlight || !lastBlockHighlight || arrCoordsShip.length == 0) {
        this.returnShip();
        throw new Error(this.objError.failedFinedHighLightBlock);
      }

      //создаем объект данных поставленного корабля на поле
      const objPuttingShip: IntrCoordPuttingShip = {
        ship: {
          index: +parentShip.dataset.index!,
          plane: plane,
          size: +parentShip.dataset.shipSize! as TypeSizeShip,
        },
        firstCoord: {
          x: +firstBlockHighlight.dataset.coordX!,
          y: +firstBlockHighlight.dataset.coordY!,
        },
        lastCoord: {
          x: +lastBlockHighlight.dataset.coordX!,
          y: +lastBlockHighlight.dataset.coordY!,
        },
      };
      //убираем стили подсвечивания координат
      this.resetHighlightCoord();
      //добавляем данные о координатах корабля на поле
      this.changeArrCoordPuttingShip(+parentShip.dataset.index!, 'push', objPuttingShip);
      //показываем периметр корабля на поле, за который нельзя заходить
      this.setPerimeterPuttingCoord('set', arrCoordsShip as HTMLDivElement[], paramsShip);
      //устанавливаем корабль визуально на поле по координатам
      this.field.appendChild(parentShip);

      parentShip.style.top = offsetTop + 'px';
      parentShip.style.left = offsetLeft + 'px';
      //добавляем аттрибут putting, который означает, что корабль поставлен
      parentShip.dataset.putting = 'true';

      document.removeEventListener('mousemove', this.moveCursor);
      parentShip.removeEventListener('mouseup', this.checkPosition);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   * @method returnShip - метод, который возвращает корабль в свой порт
   */
  protected returnShip = (paramsShip?: IntrParamsShip): void => {
    try {
      const { parentShip, portShip, index, plane } = paramsShip ? paramsShip : this.currentParamsShip;
      const arrRectPutting = [...this.arrFieldRect].filter((el) => el.dataset.index === `${index}`);

      if (!portShip || !parentShip) return;

      //удаляем объект данных о координатах корабля на поле, если он там был
      this.changeArrCoordPuttingShip(+index!, 'delete');
      //убираем стили подсвечивания координат
      this.resetHighlightCoord();
      //удаляем периметр корабля на поле
      this.setPerimeterPuttingCoord('delete', arrRectPutting, paramsShip);
      //удаляем связующий индекс
      this.deleteIndexPortShip(parentShip, portShip, index);
      portShip.appendChild(parentShip);

      if (plane === 'vertical') this.changePlane('vertical', paramsShip);

      parentShip.style.zIndex = '2';
      parentShip.style.left = '0';
      parentShip.style.top = '0';
      parentShip.dataset.putting = 'false';

      parentShip.removeEventListener('mouseup', this.checkPosition);
      document.removeEventListener('mousemove', this.moveCursor);
    } catch (e) {
      console.error(e);
    }
  };
  // /#Methods for Handelrs

  // #General methdos
  /**
   * @method changePlane - метод, который отвечает
   * за изменение плоскости корабля ('horizontal' | 'vertical')
   * @param current - принимает плоскость, c которой нужно поменять
   */
  protected changePlane = (current?: TypePlaneShip, paramShip?: IntrParamsShip): void => {
    const { parentShip, widthParentShip, heightParentShip } = paramShip ? paramShip : this.currentParamsShip;
    const { shiftX, shiftY } = this.currentParamsShip;
    const plane = current ? current : this.currentParamsShip.plane;

    if (plane === 'horizontal') {
      parentShip!.dataset.plane = 'vertical';
      this.currentParamsShip.plane = 'vertical';

      this.currentParamsShip.widthParentShip = heightParentShip;
      this.currentParamsShip.heightParentShip = widthParentShip;

      if (paramShip) return;
      this.currentParamsShip.shiftX = shiftY;
      this.currentParamsShip.shiftY = shiftX;
    } else {
      parentShip!.dataset.plane = 'horizontal';
      this.currentParamsShip.plane = 'horizontal';

      this.currentParamsShip.widthParentShip = widthParentShip;
      this.currentParamsShip.heightParentShip = heightParentShip;

      if (paramShip) return;
      this.currentParamsShip.shiftX = shiftY;
      this.currentParamsShip.shiftY = shiftX;
    }
  };
  /**
   * @method deleteIndexPortShip - метод, который удаляет связь между кораблем и его портом,
   * в случае если его нужно будет вернуть обратно в порт
   * @param parentShip - родитель корабля
   * @param portShip - порт корабля
   * @param index - связующий индекс корабля с портом
   */
  deleteIndexPortShip = (parentShip: HTMLDivElement, portShip: HTMLDivElement, index?: number): void => {
    parentShip.removeAttribute('data-index');
    portShip.removeAttribute('data-index');

    this.arrObjPotShip = this.arrObjPotShip.filter((el) => el.index != index);
  };
  /**
   * @method setIndexPortShip - метод, который устанавливает связь между кораблем и его портом,
   * в случае если его нужно будет вернуть. Связь устанавливается методом простановки одинаковых индексов,
   * которые прописываются в аттрибут data-index.
   * Если связь уже была установлена, то просто возвращается связанный индекс.
   * @param parentShip - родитель корабля
   * @param portShip - порт корабля
   * @param putIndex - определенный индекс, которым нужно связать порт и корабль
   */
  protected setIndexPortShip = (parentShip: HTMLDivElement, portShip: HTMLDivElement, putIndex?: number): number | undefined => {
    const indexParent = parentShip.dataset.index;
    let index: number | undefined;

    if (!indexParent && portShip) {
      console.log(this.nameClass + ': The ship was not connected to the port, start linkig...');
      const { length } = this.arrObjPotShip;
      const obj: IntrObjPortShip = {
        index: length,
        port: portShip,
        parentShip: parentShip,
      };

      this.arrObjPotShip.push(obj);
      index = putIndex ? putIndex : length;

      portShip.setAttribute('data-index', index + '');
      parentShip.setAttribute('data-index', index + '');
      console.log(this.nameClass + ': The ship successfully linked the port');
    } else if (indexParent) {
      index = Number(indexParent);
    }

    return index;
  };
  /**
   * @method toggleHighlightShipCoord - метод, который подсвечивает координаты
   * над которыми находится корабль
   */
  protected toggleHighlightShipCoord = (): void => {
    const { parentShip } = this.currentParamsShip;
    if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);

    const coordParentShip = parentShip.getBoundingClientRect();

    this.arrCoordFieldRect.forEach((coordRect, i) => {
      if (this.isShowingHighlightShipCoord(coordRect, coordParentShip)) {
        const rect = this.arrFieldRect[i];
        const isTest = !rect.classList.contains(this.style.perimeter) && !rect.classList.contains(this.style.putting);
        //если корабль не на координате перемитра другого корабля, то подсвечиваем координату
        if (isTest) rect.classList.add(this.style.highlight);
      } else {
        this.arrFieldRect[i].classList.remove(this.style.highlight);
      }
    });
  };
  /**
   * @method isShowingHighlightShipCoord - метод, который вычесляет, над какими координатами,
   * находится корабль.
   *
   * @returns boolean:
   * - true находится пол короблем;
   * - false не находится под кораблем.
   */
  protected isShowingHighlightShipCoord = (coordRect: DOMRect, coordParentShip: DOMRect): boolean => {
    const { plane } = this.currentParamsShip;
    const isPlane = plane === 'horizontal';
    let res: boolean = false;
    // Вычисляем допустимые границы по оси Y
    // const minTop = coordRect.top - ((isPlane) ? (coordParentShip.height / 2) : (coordParentShip.width / 2));
    // const maxBottom = coordRect.bottom + ((isPlane) ? (coordParentShip.height / 2) : (coordParentShip.width / 2));
    // Вычисляем допустимые границы по оси X
    let minLeft = coordParentShip.left - coordRect.width / 2;
    let maxRight = coordParentShip.right + coordRect.width / 2;

    if (isPlane) {
      const minTop = coordRect.top - coordParentShip.height / 2;
      const maxBottom = coordRect.bottom + coordParentShip.height / 2;
      // Проверяем заходит ли корабль за поле или нет, если да, то изменяем диапазоны для координат
      if (this.coordFiled.right < coordParentShip.right) minLeft = minLeft - (coordParentShip.right - this.coordFiled.right);
      if (this.coordFiled.left > coordParentShip.left) maxRight = maxRight + (this.coordFiled.left - coordParentShip.left);
      // Проверяем, попадает ли корабль в допустимую область по Y и по X
      const testVertical = coordParentShip.top >= minTop && coordParentShip.bottom <= maxBottom;
      const testHorizontal = coordRect.left >= minLeft && coordRect.right <= maxRight;

      res = testHorizontal && testVertical;
    } else {
      let minTop = coordParentShip.top - coordParentShip.width / 2;
      let maxBottom = coordParentShip.bottom + coordParentShip.width / 2;

      if (this.coordFiled.top > coordParentShip.top) maxBottom = maxBottom + (this.coordFiled.top - coordParentShip.top);
      if (this.coordFiled.bottom < coordParentShip.bottom) minTop = minTop - (coordParentShip.bottom - this.coordFiled.bottom);

      // Проверяем, попадает ли корабль в допустимую область по Y и по X
      const testVertical = coordRect.top >= minTop && coordRect.bottom <= maxBottom;
      const testHorizontal = coordRect.left >= minLeft && coordRect.right <= maxRight;

      res = testHorizontal && testVertical;
    }

    return res;
  };
  /**
   * @method isCheckAreaShip - метод, который вычесляет находится ли корабль в области поля.
   *
   * @return boolean:
   * - true находится в области поля;
   * - false не находится в области поля.
   *
   * ** Примечание**:
   * - Диапазон увеличен для поля. Увеличение поля зависит от половины размеров корабля.
   * - Например: если корабль будет 200 weight, то right поля = right + (weight корабля / 1.5),
   * а left поля будет = left - (weight корабля / 1.5).
   * С top и bottom поля будет увеличение диапазона входа корабля по его height;
   */
  protected isCheckAreaShip = (): boolean => {
    const { parentShip } = this.currentParamsShip;
    if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);

    const { widthParentShip, heightParentShip } = this.currentParamsShip;
    const coordFieldBattle = this.coordFiled;
    const coordParentShip = parentShip.getBoundingClientRect();

    const objRangePosition = {
      top: coordFieldBattle.top - heightParentShip / 1.5,
      bottom: coordFieldBattle.bottom + heightParentShip / 1.5,
      left: coordFieldBattle.left - widthParentShip / 1.5,
      right: coordFieldBattle.right + widthParentShip / 1.5,
    };

    let test: boolean = true;

    if (coordParentShip.top < objRangePosition.top || coordParentShip.bottom > objRangePosition.bottom) {
      test = false;
    } else if (coordParentShip.left < objRangePosition.left || coordParentShip.right > objRangePosition.right) {
      test = false;
    }

    return test;
  };
  /**
   * @method changeArrCoordPuttingShip - метод, который отвечает за добавления информации
   * о координатах корабля в массив.
   * @param index - связующий корабль и порт;
   * @param type - принимает тип 'delete' | 'push';
   * @param obj - принимает объект при @param type = 'push;
   */
  protected changeArrCoordPuttingShip = (index: number, type: 'delete' | 'push', objPuttingShip?: IntrCoordPuttingShip): void => {
    const searchIndex = this._arrCoordPuttingShip.findIndex((el) => index == el.ship.index);

    switch (type) {
      case 'delete':
        if (+searchIndex != -1) {
          this._arrCoordPuttingShip.splice(searchIndex, 1);
          this.dispatch(actionsConstructor.setLastCoordsShips(this._arrCoordPuttingShip));
        }
        break;
      case 'push':
        //смотрим, если корабль быле уже в массиве поставленных кораблей,
        //то перезаписываем на обновленные данные
        if (searchIndex == -1) {
          this._arrCoordPuttingShip.push(objPuttingShip!);
        } else {
          this._arrCoordPuttingShip[searchIndex] = objPuttingShip!;
        }

        this.dispatch(actionsConstructor.setLastCoordsShips(this._arrCoordPuttingShip));
        break;
    }
  };
  /**
   * @method checkDblClick - метод, который определяет был ли dblClick или нет.
   * @param callback - метод, который нужно вызвать, если dblClick был совершен
   */
  protected checkDblClick = (callback): boolean => {
    let isRes: boolean = false;
    const { index } = this.currentParamsShip;
    const currentTime = Date.now(); // Текущее время

    const arrRectPutting = [...this.arrFieldRect].filter((el) => el.dataset.index === `${index}`);
    this.setPerimeterPuttingCoord('delete', arrRectPutting);

    // Если интервал между кликами меньше 500 мс, увеличиваем счётчик
    if (currentTime - this.lastClickTime < 300) {
      this.clickCount++;
    } else {
      this.clickCount = 1; // Иначе сбрасываем счётчик
    }

    this.lastClickTime = currentTime; // Обновляем время последнего клика
    if (this.clickCount == 2) {
      isRes = true;
      this.clickCount = 0;
      callback();
    }

    this.toggleHighlightShipCoord();

    return isRes;
  };
  /**
   * @method resetHighlightCoord - метод, убирает стиль подсвечивания координат
   */
  protected resetHighlightCoord = (): void => {
    this.arrFieldRect.forEach((rect) => {
      if (!rect) return;
      rect.classList.remove(this.style.highlight);
    });
  };
  /**
   * @method setPerimeterPuttingCoord - метод подсвечивает периметр вокруг корабля за который
   * нельзя заходить при установке другого корабля на поле;
   * @param arrRectPutting - массив подсвеченных координат, на которых стоит корабль;
   * @param type - тип действия, который принимает 'set' | 'delete'.
   *
   * @description
   * - это важный метод в построении логики показа зоны(периметра) корабля.
   *
   * Пояснение аттрибутов:
   * - data-index - задается самим координатам, на которых "стоит" корабль. Присваивается исходя из id корабля
   * - data-perimeter-index - массив индефикаторов координат корабля, задается периметру кораблей в случае,
   * если периметр больше не связан с индекфикаторами кораблей, то он удаляется с поля.
   */
  protected setPerimeterPuttingCoord = (type: 'set' | 'delete', arrRectPutting: HTMLDivElement[], paramsShip?: IntrParamsShip): void => {
    try {
      const { perimeter, putting } = this.style;
      const { plane, index } = paramsShip ? paramsShip : this.currentParamsShip;
      const isPlane = plane === 'horizontal';

      //функция измененния периметра
      const togglePerimeter = (elPerimeter: HTMLDivElement | null, ishouldAdd: boolean): void => {
        if (!elPerimeter) return;

        if (ishouldAdd) {
          //если еще не было ни одной связки периметра с кораблем, то установим первую связь.
          //если же она была, то добавляем связь с еще одним кораблем
          if (!elPerimeter.hasAttribute('data-perimeter-index')) {
            elPerimeter.dataset.perimeterIndex = '[' + index + ']';
            elPerimeter.classList.toggle(perimeter, ishouldAdd);
          } else {
            const arrIndex: number[] = JSON.parse(elPerimeter.dataset.perimeterIndex!);
            arrIndex.push(index);
            const arrJSON = JSON.stringify(arrIndex);

            elPerimeter.dataset.perimeterIndex = arrJSON;
            return;
          }
        } else {
          //удаляем связь
          const arrIndex: number[] = JSON.parse(elPerimeter.dataset.perimeterIndex!).filter((el: number) => +el !== index);
          //если связей больше нет, то убираем показ периметра
          //если связя еще имеется с другими кораблями, то перезапишем аттрибут
          if (arrIndex.length === 0) {
            elPerimeter.removeAttribute('data-perimeter-index');
            elPerimeter.classList.toggle(perimeter, ishouldAdd);
          } else {
            const arrJSON = JSON.stringify(arrIndex);
            elPerimeter.dataset.perimeterIndex = arrJSON;
          }
        }
      };
      //функция поиска периметра по координатам
      const getElementByCoords = (x: number, y: number): HTMLDivElement | null => {
        return this.field.querySelector(`[data-coord-x='${x}'][data-coord-y='${y}']`) as HTMLDivElement;
      };

      arrRectPutting.forEach((rect, i, arr) => {
        const rectX = rect.dataset.coordX as string;
        const rectY = rect.dataset.coordY as string;
        //проверка находится ли корма или нос корабля под координатой
        const isBow = i === 0;
        const isStern = i === arr.length - 1;
        //правый борт
        const rectRightBoard = isPlane ? getElementByCoords(+rectX, +rectY - 1) : getElementByCoords(+rectX + 1, +rectY);
        //левый борт
        const rectLeftBoard = isPlane ? getElementByCoords(+rectX, +rectY + 1) : getElementByCoords(+rectX - 1, +rectY);
        //нос корабля
        const rectBow = isBow && isPlane ? rect.previousElementSibling : isBow && !isPlane ? getElementByCoords(+rectX, +rectY - 1) : null;
        //корма корабля
        const rectStern = isStern && isPlane ? rect.nextElementSibling : isStern && !isPlane ? getElementByCoords(+rectX, +rectY + 1) : null;
        //периметры по бокам от кормы или от носа
        const rectBowLeft = isBow && isPlane ? getElementByCoords(+rectX - 1, +rectY - 1) : isBow && !isPlane ? getElementByCoords(+rectX - 1, +rectY - 1) : null;
        const rectBowRight = isBow && isPlane ? getElementByCoords(+rectX - 1, +rectY + 1) : isBow && !isPlane ? getElementByCoords(+rectX + 1, +rectY - 1) : null;
        const rectSternLeft = isStern && isPlane ? getElementByCoords(+rectX + 1, +rectY + 1) : isStern && !isPlane ? getElementByCoords(+rectX - 1, +rectY + 1) : null;
        const rectSternRight = isStern && isPlane ? getElementByCoords(+rectX + 1, +rectY - 1) : isStern && !isPlane ? getElementByCoords(+rectX + 1, +rectY + 1) : null;

        const ishouldAdd = type === 'set';

        togglePerimeter(rectRightBoard, ishouldAdd);
        togglePerimeter(rectLeftBoard, ishouldAdd);
        togglePerimeter(rectBow as HTMLDivElement | null, ishouldAdd);
        togglePerimeter(rectStern as HTMLDivElement | null, ishouldAdd);
        togglePerimeter(rectBowLeft, ishouldAdd);
        togglePerimeter(rectBowRight, ishouldAdd);
        togglePerimeter(rectSternLeft, ishouldAdd);
        togglePerimeter(rectSternRight, ishouldAdd);

        rect.classList.toggle(putting, ishouldAdd);
        if (ishouldAdd) {
          rect.dataset.index = '' + index;
        } else {
          rect.removeAttribute('data-index');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  // #General methdos
}

export default class ManagerConstructor extends ConstructorMoveShip {
  constructor(field: HTMLDivElement, elConstructor: HTMLDivElement) {
    super(field, elConstructor);
  }

  /**
   * @method resetPositionShips - возвращает корабли на свое изначальное место
   */
  resetPositionShips = (): void => {
    const currentArrPuttingCoordShipds = [...this._arrCoordPuttingShip];
    currentArrPuttingCoordShipds.forEach((el) => {
      const transformation = this.tranformationObjParamsShip(el);
      this.returnShip(transformation);
    });

    this.arrShip.forEach((ship) => {
      const portShip = ship.closest('[data-port-ship]');
      portShip?.removeAttribute('data-index');
      ship?.removeAttribute('data-index');
    });

    this._arrCoordPuttingShip = [];
    this.arrObjPotShip = [];
  };
  /**
   * @method randomPositionShips - ставит корабли на случайные позиции
   */
  randomPositionShips = (): void => {
    try {
      const listRandomCoordsShip: IntrCoordPuttingShip[] = new Bot(false).placeShip();
      let res: IntrFullDataShipBattle[] = [];

      this.resetPositionShips();
      this.autoIndexPortShip(listRandomCoordsShip);

      res = transformationToFullCoordShips(listRandomCoordsShip);

      res.forEach((el) => {
        const transformation = this.tranformationObjParamsShip(el);

        if (!transformation) {
          return;
        }

        if (transformation.plane != 'horizontal') this.changePlane('horizontal', transformation);
        this.putShip(transformation);
      });
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * @method setLastCoordsShips - при переходе в конструктор ставит корабли в расположение, в котором
   * они были до этого, если был выход из конструктора ранее
   */
  setLastCoordsShips = (): void => {
    const { lastCoordPuttingShip } = this.getState().constructorField;
    let res: IntrFullDataShipBattle[] = [];

    this.resetPositionShips();
    this.autoIndexPortShip(lastCoordPuttingShip);

    res = transformationToFullCoordShips(lastCoordPuttingShip);

    res.forEach((el) => {
      const transformation = this.tranformationObjParamsShip(el);
      if (!transformation) {
        return;
      }

      if (transformation.plane != 'horizontal') this.changePlane('horizontal', transformation);

      this.putShip(transformation);
    });
  };
  /**
   * @method randomPositionShips - трансформируем в необходимую структуру данные кораблей
   * для других методов
   */
  protected tranformationObjParamsShip = (paramsShip: IntrCoordPuttingShip | IntrFullDataShipBattle): IntrParamsShip | undefined => {
    try {
      const { index, plane, size } = paramsShip.ship;
      let coords: IntrCoord[] = [];

      if ('coords' in paramsShip) {
        coords = paramsShip.coords;
      }

      const obj = {
        parentShip: document.querySelector(`[data-ship][data-index='${index}']`) as HTMLDivElement,
        portShip: document.querySelector(`[data-port-ship][data-index='${index}']`) as HTMLDivElement,
        index: index,
        plane: plane,
        size: size,
      } as IntrParamsShip;

      obj.widthParentShip = obj.parentShip?.offsetWidth ? obj.parentShip?.offsetWidth : 0;
      obj.heightParentShip = obj.parentShip?.offsetHeight ? obj.parentShip?.offsetHeight : 0;

      if (coords.length != 0) {
        obj.coords = coords;
      }

      return obj;
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * @method autoIndexPortShip - связывание корабля с портом, если данные с индексами уже есть
   */
  protected autoIndexPortShip = (listCoordsPuttingShips: IntrCoordPuttingShip[]): void => {
    try {
      const transformList = [...document.querySelectorAll<HTMLDivElement>('[data-ship]')];

      listCoordsPuttingShips.forEach((el) => {
        const { index, size: currentSize } = el.ship;

        const parentShip = transformList.find((el) => {
          const isIndex = el.hasAttribute('data-index');
          const size = el.getAttribute('data-ship-size');

          if (!size) {
            return false;
          }

          return !isIndex && +size == +currentSize;
        });

        const portShip = parentShip?.closest('[data-port-ship]') as HTMLDivElement;

        if (!portShip || !parentShip) {
          return;
        }
        // console.log(parentShip, portShip);
        this.setIndexPortShip(parentShip, portShip, index);
      });
    } catch (error) {
      console.error(error);
    }
  };
}
