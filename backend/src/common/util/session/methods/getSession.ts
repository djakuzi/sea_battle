export function getSession<D>(sessions: Map<string, D>, idSession: string):D {
	const session = sessions.get(idSession);

	if (!session) {
		throw new Error(`Session with ID ${idSession} not found`);
	}

	return session;
}