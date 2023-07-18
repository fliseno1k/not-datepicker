import { getId } from './id';

export class Atom {
	public readonly id: string = getId();

	public readonly date: Date;

	public readonly value: string;

	private modifiersSet: Set<string>;

	constructor(date: Date, value: string, modifiers?: string[]) {
		this.date = date;
		this.value = value;

		this.modifiersSet = new Set(modifiers ?? []);
	}

	public get modifiers(): string[] {
		return Array.from(this.modifiersSet);
	}

	public set modifiers(modifiers: string[]) {
		this.modifiersSet = new Set(modifiers);
	}

	public addModifier(modifier: string): void {
		this.modifiersSet.add(modifier);
	}

	public deleteModifier(modifier: string): void {
		this.modifiersSet.delete(modifier);
	}

	public is(modifier: string): boolean {
		return this.modifiersSet.has(modifier);
	}
}
