import { Atom } from '../atom';
import { getMonthEnd, getMonthLength, getMonthStart, getNextDate, normalizeMonthDate, shiftDateOnDays } from '../dates';

function evaluateMonth(from: Date, length: number): Atom[] {
	const collection = new Array(length);

	let nextDate = from;
	for (let i = 0; i < length; i++, nextDate = getNextDate(nextDate)) {
		const atom = new Atom(nextDate, nextDate.getDate() + '');
		collection[i] = atom;
	}

	return collection;
}

export function baseMonthFactory(date: Date): Atom[] {
	const normalizedDate = normalizeMonthDate(date);
	const monthStart = getMonthStart(normalizedDate);
	const monthLength = getMonthLength(normalizedDate);
	const month = evaluateMonth(monthStart, monthLength);

	return month;
}

export function spacelessMonthFactory(date: Date): Atom[] {
	const normalizedDate = normalizeMonthDate(date);
	const monthStart = getMonthStart(normalizedDate);
	const monthEnd = getMonthEnd(normalizedDate);

	const prevMonthDays = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
	const nextMonthDays = monthEnd.getDay() === 0 ? 0 : 6 - monthEnd.getDay() + 1;

	const finalMonthLength = getMonthLength(normalizedDate) + prevMonthDays + nextMonthDays;
	const finalStartDate = shiftDateOnDays(monthStart, -1 * prevMonthDays);

	const month = evaluateMonth(finalStartDate, finalMonthLength);

	return month;
}