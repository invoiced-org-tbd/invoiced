type StringKeyOf<TValue> = Extract<keyof TValue, string>;
type DataTableLeafObject = Date;

type DataTableObjectPathSegments<TValue> = TValue extends object
	? {
			[TKey in StringKeyOf<TValue>]: NonNullable<
				TValue[TKey]
			> extends readonly unknown[]
				? TKey
				: NonNullable<TValue[TKey]> extends DataTableLeafObject
					? TKey
					: NonNullable<TValue[TKey]> extends object
						?
								| TKey
								| `${TKey}.${DataTableObjectPathSegments<NonNullable<TValue[TKey]>>}`
						: TKey;
		}[StringKeyOf<TValue>]
	: never;

export type DataTableObjectPath<TValue> = Extract<
	DataTableObjectPathSegments<TValue>,
	string
>;

export const getDataTableValueByPath = (
	value: unknown,
	path: string,
): unknown => {
	if (!path) {
		return undefined;
	}

	let currentValue = value;
	const segments = path.split('.');

	for (const segment of segments) {
		if (!segment) {
			return undefined;
		}
		if (currentValue === null || currentValue === undefined) {
			return undefined;
		}
		if (Array.isArray(currentValue)) {
			return undefined;
		}
		if (currentValue instanceof Date) {
			return undefined;
		}
		if (typeof currentValue !== 'object') {
			return undefined;
		}

		currentValue = (currentValue as Record<string, unknown>)[segment];
	}

	return currentValue;
};
