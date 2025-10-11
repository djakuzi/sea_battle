export function createSessionByUserId (
	id1: string | number, 
	id2: string | number,
	startWord: string = '',
):string {
	const [minId, maxId] = [id1, id2].sort();
	return startWord + `${minId}-${maxId}`;
}