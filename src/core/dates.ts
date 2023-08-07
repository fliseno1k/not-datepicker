export function getMonthStart(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthEnd(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getMonthLength(date: Date): number {
	return getMonthEnd(date).getDate();
}

export function getNextDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function shiftDate(from: Date, step: number): Date {
	return new Date(from.getFullYear(), from.getMonth(), from.getDate() + step);
}

export function normalizeMonthDate(date: Date): Date {
	const normalized = new Date(date);
	normalized.setHours(0, 0, 0, 0);

	return normalized;
}
