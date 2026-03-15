import type {
	DataTableAccessorKeyColumn,
	DataTableCulumnFormat,
	DataTableCulumnFormatConfig,
} from './types';
import { isValid as isValidDate } from 'date-fns';

type FormatConfigMap = {
	[K in DataTableCulumnFormat]: Extract<
		DataTableCulumnFormatConfig,
		{ kind: K }
	>;
};

type FormatDetector<K extends DataTableCulumnFormat = DataTableCulumnFormat> = {
	detect: (value: unknown) => boolean;
	format: FormatConfigMap[K];
};

const createFormatDetector = <K extends DataTableCulumnFormat>(
	detector: FormatDetector<K>,
) => detector;

const textFormatDetector = createFormatDetector<'text'>({
	detect: (value) => typeof value === 'string',
	format: {
		kind: 'text',
	},
});
const numberFormatDetector = createFormatDetector<'number'>({
	detect: (value) => typeof value === 'number' && !Number.isNaN(value),
	format: {
		kind: 'number',
	},
});
const dateFormatDetector = createFormatDetector<'date'>({
	detect: (value) => isValidDate(value),
	format: {
		kind: 'date',
	},
});
const booleanFormatDetector = createFormatDetector<'boolean'>({
	detect: (value) => typeof value === 'boolean',
	format: {
		kind: 'boolean',
	},
});
const arrayFormatDetector = createFormatDetector<'array'>({
	detect: (value) => Array.isArray(value),
	format: {
		kind: 'array',
	},
});

const formatDetectors = {
	text: textFormatDetector,
	number: numberFormatDetector,
	date: dateFormatDetector,
	boolean: booleanFormatDetector,
	array: arrayFormatDetector,
} satisfies {
	[K in DataTableCulumnFormat]: FormatDetector<K>;
};

type InferDataTableColumnFormatParams<TData> = {
	value: unknown;
	column: DataTableAccessorKeyColumn<TData>;
};
export const inferDataTableColumnFormat = <TData>({
	value,
	column,
}: InferDataTableColumnFormatParams<TData>): DataTableCulumnFormatConfig => {
	if (column.format) {
		return column.format;
	}

	for (const detector of Object.values(formatDetectors)) {
		if (detector.detect(value)) {
			return detector.format;
		}
	}

	return textFormatDetector.format;
};
