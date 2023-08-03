import { Atom } from './atom';

const WEEK_LENGTH = 7;
const EMPTY_CELL = '00';

function emtpyWeek(): string[] {
	return new Array(WEEK_LENGTH).fill(EMPTY_CELL);
}

function toValue(atom: Atom): string {
	return atom.date.getDate().toString().padStart(2, '0');
}

function printMonth(month: Atom[]): void {
	if (month.length === 0) {
		throw new Error('Provide none empty month');
	}

	const firstDay = month[0].date.getDay() - 1;

	for (let i = -firstDay; i < month.length + firstDay; i += WEEK_LENGTH) {
		const start = Math.max(i, 0);
		const end = Math.min(i + WEEK_LENGTH - 1, month.length - 1);
		const days = month.slice(start, end + 1).map(toValue);

		let outputString = '';

		if (days.length === 7) {
			outputString = days.join(' ');
		} else {
			const week = emtpyWeek();
			week.splice((start + 1) % 7, days.length, ...days);

			outputString = week.join(' ');
		}

		console.log(outputString);
	}
}
