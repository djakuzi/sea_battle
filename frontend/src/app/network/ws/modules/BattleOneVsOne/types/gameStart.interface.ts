export interface IntrEventGameStart {
	enemy: {
		id: string;
		nickname: string;
		experience: number;
		type: 'guest' | 'player';
	},
	firstMove: string,
}

