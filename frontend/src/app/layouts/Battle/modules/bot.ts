import { IntrCoord, IntrCoordPuttingShip } from '../../../common/types/Ship.interface';
import { actionsBattle } from '../../../redux/slice/battle.slice';
import { TypePlaneShip, TypeSizeShip } from '../../../common/types/Ship.type';
import { IntrInfoEnemy } from '../type/Battle.interface';
import store from '../../../redux/store';
import { CONFIG_FIELD } from '../../../core/settings/fieldCoord.settings';
import { CONFIG_SHIPS } from '../../../core/settings/ships.settings';

/**
 * @constructor принимает следующие значения:
 * @param {boolean} isBot - нужно ли инициализовать бота как сущность:
 * true - да;
 * false - нет.
 *
 * **Свойства класса**
 * @property {boolean} isBot - инициализирован ли бот как сущность;
 * @property {IntrInfoEnemy} dataBot - данные о боте;
 *
 * **Доступные методы**
 * @method  placeShip - расставляет корабли боту
 */
export class Bot {
  protected dispatch = store.dispatch;

  isBot: boolean;
  dataBot?: IntrInfoEnemy;
  protected sizeFieldCoord = CONFIG_FIELD.sizeField; // Размер поля;
  protected shipsConfig = CONFIG_SHIPS.infoShips;

  constructor(isBot = true) {
    this.isBot = isBot;

    if (isBot) {
      this.dataBot = this.createBot();
    }
  }

  private createBot(): IntrInfoEnemy {
    const dataBot: IntrInfoEnemy = {
      typeEnemy: 'bot',
      id: 0,
      nickname: 'Бот Ботович',
      experience: 999,
      countRemainingShip: 10,
    };

    store.dispatch(actionsBattle.setDataEnemy(dataBot));
    return (this.dataBot = dataBot);
  }

  public placeShip = (): IntrCoordPuttingShip[] => {
    const grid = Array(this.sizeFieldCoord)
      .fill(null)
      .map(() => Array(this.sizeFieldCoord).fill(0));
    const result: IntrCoordPuttingShip[] = [];
    let shipIndex = 0;

    for (const shipType of this.shipsConfig) {
      for (let i = 0; i < shipType.count; i++) {
        let placed = false;
        while (!placed) {
          const x = Math.floor(Math.random() * this.sizeFieldCoord);
          const y = Math.floor(Math.random() * this.sizeFieldCoord);
          const isHorizontal = Math.random() > 0.5;
          const plane: TypePlaneShip = isHorizontal ? 'horizontal' : 'vertical';

          if (this.canPlaceShip(x, y, shipType.size, isHorizontal, grid)) {
            this.markShip(x, y, shipType.size, isHorizontal, grid);
            result.push(this.createShipData(x, y, shipType.size, plane, isHorizontal, shipIndex));
            shipIndex++;
            placed = true;
          }
        }
      }
    }

    if (this.isBot) {
      this.dispatch(
        actionsBattle.setCoordPuttingShips({
          typePlayers: 'enemy',
          coordPuttingShips: result,
        }),
      );
    }

    return result;
  };

  private canPlaceShip(x: number, y: number, size: number, isHorizontal: boolean, grid: number[][]): boolean {
    if (isHorizontal) {
      if (x + size > this.sizeFieldCoord) return false;
    } else {
      if (y + size > this.sizeFieldCoord) return false;
    }

    for (let i = -1; i <= size; i++) {
      for (let j = -1; j <= 1; j++) {
        const checkX = isHorizontal ? x + i : x + j;
        const checkY = isHorizontal ? y + j : y + i;

        if (checkX >= 0 && checkX < this.sizeFieldCoord && checkY >= 0 && checkY < this.sizeFieldCoord) {
          if (grid[checkY][checkX] === 1) return false;
        }
      }
    }
    return true;
  }

  private markShip(x: number, y: number, size: number, isHorizontal: boolean, grid: number[][]): void {
    for (let i = 0; i < size; i++) {
      if (isHorizontal) {
        grid[y][x + i] = 1;
      } else {
        grid[y + i][x] = 1;
      }
    }
  }

  private createShipData(x: number, y: number, size: number, plane: TypePlaneShip, isHorizontal: boolean, index: number): IntrCoordPuttingShip {
    const firstCoord = { x, y };
    const lastCoord = isHorizontal ? { x: x + size - 1, y } : { x, y: y + size - 1 };

    return {
      ship: { index, size: size as TypeSizeShip, plane },
      firstCoord,
      lastCoord,
    };
  }
}

export class BotBattle extends Bot {
  private lastHit: IntrCoord | null = null;
  private hitDirection: 'horizontal' | 'vertical' | null = null;
  private forbiddenCoords: Set<string> = new Set();
  private damagedParts: IntrCoord[] = [];
  private currentTargets: IntrCoord[] = [];

  constructor() {
    super();
  }

  public getSelectCoordToBot = (): IntrCoord => {
    // 1. Удаляем из currentTargets уже использованные
    this.currentTargets = this.currentTargets.filter((c) => !this.forbiddenCoords.has(`${c.x},${c.y}`));

    // 2. Если есть цели — стреляем по ним
    if (this.currentTargets.length > 0) {
      return this.currentTargets.pop()!;
    }

    // 3. Если есть поврежденные части — ищем новые цели
    if (this.damagedParts.length > 0) {
      if (this.damagedParts.length >= 2) {
        this.determineDirection();
        this.currentTargets = this.generateDirectionalTargets();
      } else {
        this.currentTargets = this.generateTargetsAround(this.damagedParts[0]);
      }

      // Фильтруем ещё раз
      this.currentTargets = this.currentTargets.filter((c) => !this.forbiddenCoords.has(`${c.x},${c.y}`));

      if (this.currentTargets.length > 0) {
        return this.currentTargets.pop()!;
      }
    }

    // 4. Иначе случайная клетка
    return this.getRandomFreeCoord();
  };

  public updateShotResult = (coord: IntrCoord, result: 'hit' | 'kill' | 'miss', shipCoords?: IntrCoord[]): void => {
    const key = `${coord.x},${coord.y}`;
    this.forbiddenCoords.add(key);

    if (result === 'hit') {
      this.lastHit = coord;
      this.damagedParts.push(coord);

      if (this.damagedParts.length === 2) {
        this.determineDirection();
      }

      // Вычисляем цели
      this.currentTargets = this.hitDirection ? this.generateDirectionalTargets() : this.generateTargetsAround(coord);
    }

    if (result === 'kill' && shipCoords) {
      // 1. Добавляем периметр + клетки корабля в запрещенные
      this.addShipPerimeter(shipCoords);
      shipCoords.forEach((c) => this.forbiddenCoords.add(`${c.x},${c.y}`));

      // 2. Сброс логики атаки
      this.lastHit = null;
      this.hitDirection = null;
      this.currentTargets = [];

      // 3. Убираем повреждённые части, относящиеся к убитому кораблю
      this.damagedParts = this.damagedParts.filter((p) => !shipCoords.some((sc) => sc.x === p.x && sc.y === p.y));
    }
  };

  private determineDirection(): void {
    if (this.damagedParts.length < 2) return;

    const [a, b] = this.damagedParts;
    if (a.x === b.x) {
      this.hitDirection = 'vertical';
    } else if (a.y === b.y) {
      this.hitDirection = 'horizontal';
    }
  }

  private generateTargetsAround(coord: IntrCoord): IntrCoord[] {
    const dirs = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    const result: IntrCoord[] = [];

    for (const dir of dirs) {
      const nx = coord.x + dir.x;
      const ny = coord.y + dir.y;
      const key = `${nx},${ny}`;

      if (nx >= 0 && nx < this.sizeFieldCoord && ny >= 0 && ny < this.sizeFieldCoord && !this.forbiddenCoords.has(key)) {
        result.push({ x: nx, y: ny });
      }
    }

    return this.shuffleArray(result);
  }

  private generateDirectionalTargets(): IntrCoord[] {
    if (!this.hitDirection) return [];

    const sorted = [...this.damagedParts].sort((a, b) => (this.hitDirection === 'horizontal' ? a.x - b.x : a.y - b.y));

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const result: IntrCoord[] = [];

    const directions =
      this.hitDirection === 'horizontal'
        ? [
          { x: -1, y: 0 },
          { x: 1, y: 0 },
        ]
        : [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
        ];

    for (const dir of directions) {
      const before = { x: first.x + dir.x, y: first.y + dir.y };
      const after = { x: last.x + dir.x, y: last.y + dir.y };

      for (const candidate of [before, after]) {
        const key = `${candidate.x},${candidate.y}`;
        if (candidate.x >= 0 && candidate.x < this.sizeFieldCoord && candidate.y >= 0 && candidate.y < this.sizeFieldCoord && !this.forbiddenCoords.has(key)) {
          result.push(candidate);
        }
      }
    }

    return this.shuffleArray(result);
  }

  private addShipPerimeter(shipCoords: IntrCoord[]): void {
    const directions = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    for (const coord of shipCoords) {
      for (const dir of directions) {
        const x = coord.x + dir.x;
        const y = coord.y + dir.y;

        if (x >= 0 && x < this.sizeFieldCoord && y >= 0 && y < this.sizeFieldCoord) {
          this.forbiddenCoords.add(`${x},${y}`);
        }
      }
    }
  }

  private getRandomFreeCoord(): IntrCoord {
    const options: IntrCoord[] = [];

    for (let y = 0; y < this.sizeFieldCoord; y++) {
      for (let x = 0; x < this.sizeFieldCoord; x++) {
        const key = `${x},${y}`;
        if (!this.forbiddenCoords.has(key)) {
          options.push({ x, y });
        }
      }
    }

    if (options.length === 0) {
      throw new Error('No available cells to shoot at.');
    }

    return options[Math.floor(Math.random() * options.length)];
  }

  private shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

export class BotBattleMedium extends Bot {
  private lastHit: IntrCoord | null = null;
  private hitDirection: 'horizontal' | 'vertical' | null = null;
  private forbiddenCoords: Set<string> = new Set();
  private damagedParts: IntrCoord[] = [];
  private currentTargets: IntrCoord[] = [];

  constructor() {
    super();
  }

  public getSelectCoordToBot = (): IntrCoord => {
    // 1. Удаляем из currentTargets уже использованные
    this.currentTargets = this.currentTargets.filter((c) => !this.forbiddenCoords.has(`${c.x},${c.y}`));

    // 2. Если есть цели — стреляем по ним
    if (this.currentTargets.length > 0) {
      return this.currentTargets.pop()!;
    }

    // 3. Если есть поврежденные части — ищем новые цели
    if (this.damagedParts.length > 0) {
      if (this.damagedParts.length >= 2) {
        this.calculateShipLocations(); // Теперь рассчитываем возможные расположения корабля
        this.currentTargets = this.generateDirectionalTargets(); // Генерация новых целей на основе направления
      } else {
        this.currentTargets = this.generateTargetsAround(this.damagedParts[0]);
      }

      // Фильтруем ещё раз
      this.currentTargets = this.currentTargets.filter((c) => !this.forbiddenCoords.has(`${c.x},${c.y}`));

      if (this.currentTargets.length > 0) {
        return this.currentTargets.pop()!;
      }
    }

    // 4. Иначе используем приоритетные клетки с высокой вероятностью попадания
    const highProbAreas = this.prioritizeTargetAreas();
    if (highProbAreas.length > 0) {
      return highProbAreas.pop()!; // Выбираем клетку с высокой вероятностью попадания
    }

    // 5. Если нет приоритетных областей, используем случайную клетку
    return this.getRandomFreeCoord();
  };

  public updateShotResult = (coord: IntrCoord, result: 'hit' | 'kill' | 'miss', shipCoords?: IntrCoord[]): void => {
    const key = `${coord.x},${coord.y}`;
    this.forbiddenCoords.add(key);

    if (result === 'hit') {
      this.lastHit = coord;
      this.damagedParts.push(coord);

      if (this.damagedParts.length === 2) {
        this.determineDirection();
      }

      // Вычисляем цели
      this.currentTargets = this.hitDirection ? this.generateDirectionalTargets() : this.generateTargetsAround(coord);
    }

    if (result === 'kill' && shipCoords) {
      // 1. Добавляем периметр + клетки корабля в запрещенные
      this.addShipPerimeter(shipCoords);
      shipCoords.forEach((c) => this.forbiddenCoords.add(`${c.x},${c.y}`));

      // 2. Сброс логики атаки
      this.lastHit = null;
      this.hitDirection = null;
      this.currentTargets = [];

      // 3. Убираем повреждённые части, относящиеся к убитому кораблю
      this.damagedParts = this.damagedParts.filter((p) => !shipCoords.some((sc) => sc.x === p.x && sc.y === p.y));
    }
  };

  private determineDirection(): void {
    if (this.damagedParts.length < 2) return;

    const [a, b] = this.damagedParts;
    if (a.x === b.x) {
      this.hitDirection = 'vertical';
    } else if (a.y === b.y) {
      this.hitDirection = 'horizontal';
    }
  }

  private generateTargetsAround(coord: IntrCoord): IntrCoord[] {
    const dirs = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    const result: IntrCoord[] = [];

    for (const dir of dirs) {
      const nx = coord.x + dir.x;
      const ny = coord.y + dir.y;
      const key = `${nx},${ny}`;

      if (nx >= 0 && nx < this.sizeFieldCoord && ny >= 0 && ny < this.sizeFieldCoord && !this.forbiddenCoords.has(key)) {
        result.push({ x: nx, y: ny });
      }
    }

    // Фильтруем только наиболее вероятные клетки
    return this.shuffleArray(result);
  }

  private generateDirectionalTargets(): IntrCoord[] {
    if (!this.hitDirection) return [];

    const sorted = [...this.damagedParts].sort((a, b) => (this.hitDirection === 'horizontal' ? a.x - b.x : a.y - b.y));

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const result: IntrCoord[] = [];

    const directions =
      this.hitDirection === 'horizontal'
        ? [
          { x: -1, y: 0 },
          { x: 1, y: 0 },
        ]
        : [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
        ];

    for (const dir of directions) {
      const before = { x: first.x + dir.x, y: first.y + dir.y };
      const after = { x: last.x + dir.x, y: last.y + dir.y };

      for (const candidate of [before, after]) {
        const key = `${candidate.x},${candidate.y}`;
        if (candidate.x >= 0 && candidate.x < this.sizeFieldCoord && candidate.y >= 0 && candidate.y < this.sizeFieldCoord && !this.forbiddenCoords.has(key)) {
          result.push(candidate);
        }
      }
    }

    return this.shuffleArray(result);
  }

  private addShipPerimeter(shipCoords: IntrCoord[]): void {
    const directions = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    for (const coord of shipCoords) {
      for (const dir of directions) {
        const x = coord.x + dir.x;
        const y = coord.y + dir.y;

        if (x >= 0 && x < this.sizeFieldCoord && y >= 0 && y < this.sizeFieldCoord) {
          this.forbiddenCoords.add(`${x},${y}`);
        }
      }
    }
  }

  private getRandomFreeCoord(): IntrCoord {
    const options: IntrCoord[] = [];

    for (let y = 0; y < this.sizeFieldCoord; y++) {
      for (let x = 0; x < this.sizeFieldCoord; x++) {
        const key = `${x},${y}`;
        if (!this.forbiddenCoords.has(key)) {
          options.push({ x, y });
        }
      }
    }

    if (options.length === 0) {
      throw new Error('No available cells to shoot at.');
    }

    // Приоритетное предпочтение для более вероятных клеток
    return options[Math.floor(Math.random() * options.length)];
  }

  private prioritizeTargetAreas(): IntrCoord[] {
    const highProbAreas: IntrCoord[] = [];

    for (let y = 0; y < this.sizeFieldCoord; y++) {
      for (let x = 0; x < this.sizeFieldCoord; x++) {
        const key = `${x},${y}`;
        if (!this.forbiddenCoords.has(key)) {
          highProbAreas.push({ x, y });
        }
      }
    }

    return this.shuffleArray(highProbAreas); // Перемешиваем для случайности
  }

  private calculateShipLocations(): void {
    if (this.damagedParts.length >= 2) {
      const isHorizontal = this.damagedParts[0].y === this.damagedParts[1].y;
      if (isHorizontal) {
        this.currentTargets = this.generateDirectionalTargets(); // Генерация по горизонтали
      } else {
        this.currentTargets = this.generateDirectionalTargets(); // Генерация по вертикали
      }
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
