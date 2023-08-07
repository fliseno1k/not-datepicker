function toValue(element: any): string {
	if (!(element instanceof Date)) {
		return String(element);
	}

	return element.getDate().toString().padStart(2, '0');
}

export function printMonth(month: Date[]): void {
	for (let i = 0; i < month.length; i += 7) {
		const week = month
			.slice(i, i + 7)
			.map(toValue)
			.join(' ');

		console.log(week);
	}
}
