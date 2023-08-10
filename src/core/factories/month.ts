import { getMonthEnd, getMonthLength, getMonthStart, getNextDay, normalizeMonthDate, shiftDate } from '../dates';

export type Month = (Date | null)[];

export type CommonOptions = {
	weekStartDayIndex: number;
};

export type BaseMonthOptions = CommonOptions;

export function getBaseMonth(date: Date, options: BaseMonthOptions): Month {
	const { start, length, adjacentDays } = parseMonth(date, options);

	const month = calculateDatesSequence(start, length);
	const prevMonthEmptyCells = new Array(adjacentDays[0]).fill(null);
	const nextMonthEmptyCells = new Array(adjacentDays[1]).fill(null);

	return prevMonthEmptyCells.concat(month, nextMonthEmptyCells);
}

export type SpacelessMonthOptions = {
	withAlignmentWeek?: boolean;
} & CommonOptions;

export function getSpacelessMonth(date: Date, options: SpacelessMonthOptions): Month {
	const {
		start,
		length,
		adjacentDays: [prevDays, nextDays],
	} = parseMonth(date, options);

	const additionalWeek = options.withAlignmentWeek ? 7 : 0;
	const finalMonthLength = length + prevDays + nextDays + additionalWeek;
	const finalStartDate = shiftDate(start, -1 * prevDays);
	const month = calculateDatesSequence(finalStartDate, finalMonthLength);

	return month;
}

function parseMonth(date: Date, options: CommonOptions) {
	const { weekStartDayIndex } = options;

	const normalized = normalizeMonthDate(date);
	const start = getMonthStart(normalized);
	const end = getMonthEnd(normalized);
	const length = getMonthLength(normalized);

	let prevMonthDays = start.getDay() - weekStartDayIndex;
	prevMonthDays += prevMonthDays < 0 ? 7 : 0;

	let nextMonthDays = 6 - end.getDay() + weekStartDayIndex;
	nextMonthDays -= nextMonthDays > 6 ? 7 : 0;

	return { normalized, start, end, length, adjacentDays: [prevMonthDays, nextMonthDays] };
}

function calculateDatesSequence(from: Date, length: number): Month {
	const collection = new Array(length);

	let nextDay = from;
	for (let i = 0; i < length; i++) {
		collection[i] = nextDay;
		nextDay = getNextDay(nextDay);
	}

	return collection;
}
