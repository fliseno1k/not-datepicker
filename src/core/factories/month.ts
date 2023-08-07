import { getMonthEnd, getMonthLength, getMonthStart, getNextDay, normalizeMonthDate, shiftDate } from '../dates';

export type CommonOptions = {
	weekStartDayIndex: number;
};

export type BaseMonthOptions = {
	spaceCell: any;
} & CommonOptions;

export function getBaseMonth(date: Date, options: BaseMonthOptions): Date[] {
	const { start, length, adjacentDays } = parseMonth(date, options);

	const month = calculateDatesSequence(start, length);
	const prevMonthEmptyCells = new Array(adjacentDays[0]).fill(options.spaceCell);
	const nextMonthEmptyCells = new Array(adjacentDays[1]).fill(options.spaceCell);

	return prevMonthEmptyCells.concat(month, nextMonthEmptyCells);
}

export type SpacelessMonthOptions = {
	withAlignmentWeek?: boolean;
} & CommonOptions;

export function getSpacelessMonth(date: Date, options: SpacelessMonthOptions): Date[] {
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

function calculateDatesSequence(from: Date, length: number): Date[] {
	const collection = new Array(length);

	let nextDay = from;
	for (let i = 0; i < length; i++) {
		collection[i] = nextDay;
		nextDay = getNextDay(nextDay);
	}

	return collection;
}
