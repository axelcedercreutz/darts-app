export const notNull = <T>(value: T | null): value is T => {
	return value !== null;
};

export const toThrowString = ({
	sector,
	multiplier,
}: {
	sector:
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 25;
	multiplier: 1 | 2 | 3;
}) => {
	switch (multiplier) {
		case 1:
			return sector.toString();
		case 2:
			return `D${sector}`;
		case 3:
			return `T${sector}`;
	}
};
