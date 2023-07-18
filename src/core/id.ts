export function idCounter() {
	let id = 0;
	return () => `${++id}`;
}

export const getId = idCounter();
