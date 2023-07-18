/**
 * Calculates amount of days in passed date
 */
export function getDaysCount(date: Date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Calculates current decade
 */
export function getDecade(date: Date) {
	const firstYear = Math.floor(date.getFullYear() / 10) * 10;
	return [firstYear, firstYear + 9];
}

/**
 * Calculate first day of the week
 */
export function getFirstWeekday(date: Date) {
	const firstWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return firstWeekDay;
}
