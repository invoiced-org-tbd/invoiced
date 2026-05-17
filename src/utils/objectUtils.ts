// type-safe Object.keys
export const objectKeys = <T extends Record<string, unknown>>(
	object: T,
): (keyof T)[] => Object.keys(object);
