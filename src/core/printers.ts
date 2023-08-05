import { Atom } from './atom';

const WEEK_LENGTH = 7;
const EMPTY_CELL = '  ';

function emtpyWeek(): string[] {
	return new Array(WEEK_LENGTH).fill(EMPTY_CELL);
}

function toValue(atom: Atom): string {
	return atom.date.getDate().toString().padStart(2, '0');
}

export function printMonth(month: Atom[], firstDayIndex: number = 0): void {
	if (month.length === 0) {
		throw new Error('Provide none empty month');
	}

	let firstDay = month[0].date.getDay() - firstDayIndex;
	firstDay += firstDay < 0 ? 7 : 0;

	for (let i = -firstDay; i < month.length + 1; i += WEEK_LENGTH) {
		const start = Math.max(i, 0);
		const end = Math.min(i + WEEK_LENGTH - 1, month.length - 1);
		const days = month.slice(start, end + 1).map(toValue);

		let outputString = '';

		if (days.length === WEEK_LENGTH) {
			outputString = days.join(' ');
		} else {
			const week = emtpyWeek();
			week.splice((start + firstDay) % WEEK_LENGTH, days.length, ...days);

			outputString = week.join(' ');
		}

		console.log(outputString);
	}
}
