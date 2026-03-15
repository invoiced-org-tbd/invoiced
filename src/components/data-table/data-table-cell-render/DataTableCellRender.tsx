import { format as formatDate } from 'date-fns';
import type { FC } from 'react';
import type {
	DataTableCellRenderProps,
	DataTableCulumnFormat,
	DataTableCulumnFormatConfig,
} from './types';
import { Checkbox } from '@/components/checkbox';
import { Switch } from '@/components/switch';
import { toDate } from '@/utils/dateUtils';
import { inferDataTableColumnFormat } from './utils';
import { Tooltip } from '@/components/tooltip';

const assertNever = (value: never): never => value;

type FormatConfigMap = {
	[kind in DataTableCulumnFormat]: Extract<
		DataTableCulumnFormatConfig,
		{ kind: kind }
	>;
};
type CellProps<K extends DataTableCulumnFormat> = {
	data: unknown;
	format: FormatConfigMap[K];
};

const TextCell = ({ data, format }: CellProps<'text'>) => {
	const value = String(data);
	const style = format.style || 'text';

	switch (style) {
		case 'text': {
			return <span>{value}</span>;
		}
		case 'email': {
			return (
				<a
					href={`mailto:${value}`}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-600 hover:underline'
				>
					{value}
				</a>
			);
		}
		case 'id': {
			const displayValue = value.slice(0, 8);

			return (
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<span>#{displayValue}</span>
					</Tooltip.Trigger>
					<Tooltip.Content>{value}</Tooltip.Content>
				</Tooltip.Root>
			);
		}
		case 'phone': {
			return (
				<a
					href={`tel:${value}`}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-600 hover:underline'
				>
					{value}
				</a>
			);
		}
	}
	return assertNever(style);
};

const NumberCell = ({ data, format }: CellProps<'number'>) => {
	const value = parseFloat(String(data));
	if (Number.isNaN(value)) {
		return null;
	}
	const style = format.style || 'integer';

	switch (style) {
		case 'integer': {
			return <span>{Math.round(value).toString()}</span>;
		}
		case 'float': {
			return <span>{value.toFixed(2).toString()}</span>;
		}
		case 'currency': {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			return <span>{formatter.format(value)}</span>;
		}
		case 'percent': {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'percent',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			return <span>{formatter.format(value)}</span>;
		}
	}
	return assertNever(style);
};

const DateCell = ({ data, format }: CellProps<'date'>) => {
	const value = toDate(data);
	if (!value) {
		return null;
	}
	const style = format.style || 'date';

	switch (style) {
		case 'date': {
			return <span>{formatDate(value, 'PP')}</span>;
		}
		case 'time': {
			return <span>{formatDate(value, 'p')}</span>;
		}
		case 'datetime': {
			return <span>{formatDate(value, 'PP p')}</span>;
		}
	}
	return assertNever(style);
};

const BooleanCell = ({ data, format }: CellProps<'boolean'>) => {
	const value = Boolean(data);
	const style = format.style || 'checkbox';

	switch (style) {
		case 'checkbox': {
			return <Checkbox value={value} />;
		}
		case 'yesNo': {
			return <span>{value ? 'Yes' : 'No'}</span>;
		}
		case 'switch': {
			return <Switch value={value} />;
		}
		case 'trueFalse': {
			return <span>{value ? 'True' : 'False'}</span>;
		}
	}
	return assertNever(style);
};

const ArrayCell = ({ data, format }: CellProps<'array'>) => {
	if (!Array.isArray(data) || data.length === 0) {
		return null;
	}
	const style = format.style || 'array';

	const items = data
		.filter((item) => item !== undefined && item !== null)
		.map((item) =>
			typeof item === 'object' ? JSON.stringify(item) : String(item),
		);

	switch (style) {
		case 'array': {
			return <span>[{items.join(', ')}]</span>;
		}
		case 'list': {
			return (
				<ul className='list-inside list-disc'>
					{items.map((item, index) => (
						<li key={`${item}-${index}`}>{item}</li>
					))}
				</ul>
			);
		}
	}
	return assertNever(style);
};

const cellMap = {
	text: TextCell,
	number: NumberCell,
	date: DateCell,
	boolean: BooleanCell,
	array: ArrayCell,
} satisfies {
	[K in DataTableCulumnFormat]: FC<CellProps<K>>;
};

export const DataTableCellRender = <TData,>({
	data,
	column,
}: DataTableCellRenderProps<TData>) => {
	const format = inferDataTableColumnFormat({ value: data, column });

	const Cell = cellMap[format.kind];
	const value = data[column.accessorKey];

	if (value === undefined || value === null || !Cell) {
		return null;
	}

	return (
		<Cell
			data={value}
			format={format as never}
		/>
	);
};
