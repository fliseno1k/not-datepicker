import { Atom } from 'src/core/atom';
import { baseMonthFactory } from 'src/core/factories';

function getDaysSequence(from: number, to: number): number[] {
	if (from > to) {
		throw new Error('Incorrect range of bounds');
	}

	if (from === to) {
		return [from];
	}

	return [...new Array(to - from + 1)].map((_, i) => from + i);
}

function atomsToDays(atoms: Atom[]): number[] {
	return atoms.map(atom => atom.date.getDate());
}

type MonthSpec = {
	date: Date;
	days: number[];
	conjugatedDays: {
		fromPrevMonth: number[];
		fromNextMonth: number[];
	};
};

const monthsStartsBySun: MonthSpec[] = [
	{
		date: new Date(2022, 11, 1),
		days: getDaysSequence(1, 31),
		conjugatedDays: {
			fromPrevMonth: getDaysSequence(27, 30),
			fromNextMonth: [],
		},
	},
	{
		date: new Date(2023, 0, 1),
		days: getDaysSequence(1, 31),
		conjugatedDays: {
			fromPrevMonth: [],
			fromNextMonth: getDaysSequence(1, 4),
		},
	},
	{
		date: new Date(2023, 5, 1),
		days: getDaysSequence(1, 30),
		conjugatedDays: {
			fromPrevMonth: getDaysSequence(28, 31),
			fromNextMonth: [1],
		},
	},
	{
		date: new Date(2023, 6, 1),
		days: getDaysSequence(1, 31),
		conjugatedDays: {
			fromPrevMonth: getDaysSequence(25, 30),
			fromNextMonth: getDaysSequence(1, 5),
		},
	},
];

describe('Month factories', () => {
	describe('baseMonthFactory:', () => {
		it('should return an array that contains all dates for specified date', () => {
			const months = monthsStartsBySun.map(month => atomsToDays(baseMonthFactory(month.date)));

			expect(months).toEqual(monthsStartsBySun.map(m => m.days));
		});
	});
});
