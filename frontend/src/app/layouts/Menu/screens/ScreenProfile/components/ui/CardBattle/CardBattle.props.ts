export interface PropsCardBattle {
    cls?: string;
	data: {
		id: number,
		status: 'win' | 'lose';
		durationGame: number,
	}
}