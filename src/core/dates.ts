export function getMonthStart(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthEnd(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getMonthLength(date: Date): number {
	return getMonthEnd(date).getDate();
}

export function getNextDate(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function normalizeMonthDate(date: Date): Date {
	const normalized = new Date(date);
	normalized.setHours(0, 0, 0, 0);

	return normalized;
}

export function shiftDateOnDays(date: Date, shiftAmount: number): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + shiftAmount);
}
