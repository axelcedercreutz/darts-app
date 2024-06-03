export const notNull = <T>(value: T | null): value is T => {
	return value !== null;
};

// Utility function to get the values of an enum
export const getEnumValues = <T extends Record<string, string>>(enumObj: T): T[keyof T][] => {
	return Object.values(enumObj) as (T[keyof T])[];
  }

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
