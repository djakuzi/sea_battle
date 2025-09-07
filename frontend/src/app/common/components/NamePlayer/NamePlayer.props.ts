export interface PropsNamePlayer {
  cls: string;
  player: {
    nickname: string;
    rank: number;
    avatar?: string;
  };
  reverse?: boolean;
}
