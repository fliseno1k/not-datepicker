import { getBaseMonth, getSpacelessMonth } from 'src/core/factories';
import type { BaseMonthOptions, Month } from 'src/core/factories';

type MonthSceme = {
	date: Date;
	length: number;
	firstDayIndex: number;
	arguments: BaseMonthOptions;
};

type PreparedMonth = {
	month: (Date | null)[];
} & MonthSceme;

const monthsSchemes: MonthSceme[] = [
	{
		date: new Date(2023, 7, 1),
		length: 31,
		firstDayIndex: 1,
		arguments: {
			weekStartDayIndex: 1,
		},
	},
];

describe('Month factories', () => {
	describe('getBaseMonth()', () => {
		const preparedSchemes = monthsSchemes.map(scheme => prepareTestCases(scheme, getBaseMonth));

		for (const scheme of preparedSchemes) {
			it(`should return a valid array of dates representing a month for ${scheme.date.toLocaleDateString()}`, () => {
				expect(isMultipleOf(7)(scheme.month.length)).toBeTruthy();
				expect(hasCorrectFirstDayOffset(scheme.firstDayIndex, scheme.month));
				expect(hasCorrectDatesSequenceForSingleMonth(scheme.month));
			});
		}
	});
});

function prepareTestCases<T extends MonthSceme>(
	scheme: T,
	fn: (date: Date, options: T['arguments']) => (Date | null)[]
): PreparedMonth {
	const month = fn(scheme.date, scheme.arguments);

	return {
		...scheme,
		month,
	};
}

function isMultipleOf(divider: number) {
	return function (num: number) {
		return num % divider === 0;
	};
}

function hasCorrectFirstDayOffset(offset: number, array: any[]) {
	if (!(array[offset] instanceof Date)) {
		throw new Error('Not a date');
	}

	return isFirstDayOfMonth(array[offset]);
}

function isFirstDayOfMonth(date: Date) {
	return date.getDate() === 1;
}

function hasCorrectDatesSequenceForSingleMonth(array: Month): boolean {
	let leftOffset = 0;
	let rightOffset = array.length - 1;

	while (array[leftOffset] === null && leftOffset++) {}
	while (array[rightOffset] === null && rightOffset--) {}

	const subarray: Date[] = array.slice(leftOffset, rightOffset) as Date[];
	let prevData: number[] = [subarray[0].getDate(), subarray[0].getMonth()];

	while (subarray.length > 0) {
		const date = subarray.shift() as Date;
		const curData = [date.getDate(), date.getMonth()];

		if (curData[0] - prevData[0] !== 1 || curData[1] !== prevData[1]) {
			return false;
		}

		prevData = curData;
	}

	return true;
}
