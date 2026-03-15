import type { ReactNode } from 'react';

export type DataTableColumnBaseOptions = {
	header?: string;
};

export type DataTableCulumnFormat =
	| 'text'
	| 'number'
	| 'date'
	| 'boolean'
	| 'array';

export type DataTableCulumnFormatTextConfig = {
	kind: 'text';
	style?: 'text' | 'id' | 'email' | 'phone';
};

export type DataTableCulumnFormatNumberConfig = {
	kind: 'number';
	style?: 'integer' | 'float' | 'currency' | 'percent';
};

export type DataTableCulumnFormatDateConfig = {
	kind: 'date';
	style?: 'date' | 'time' | 'datetime';
};

export type DataTableCulumnFormatBooleanConfig = {
	kind: 'boolean';
	style?: 'checkbox' | 'switch' | 'yesNo' | 'trueFalse';
};

export type DataTableCulumnFormatArrayConfig = {
	kind: 'array';
	style?: 'array' | 'list';
};

export type DataTableCulumnFormatConfig =
	| DataTableCulumnFormatTextConfig
	| DataTableCulumnFormatNumberConfig
	| DataTableCulumnFormatDateConfig
	| DataTableCulumnFormatBooleanConfig
	| DataTableCulumnFormatArrayConfig;

export type DataTableFormatStyle = DataTableCulumnFormatConfig['style'];

export type DataTableIdColumn<TData> = {
	id: string;
	header?: ReactNode;
	accessorKey?: never;
	cell: (row: TData) => ReactNode;
};

export type DataTableAccessorKeyColumn<TData> = {
	id?: never;
	header?: ReactNode;
	accessorKey: Extract<keyof TData, string>;
	format?: DataTableCulumnFormatConfig;
	canSort?: boolean;
	canHide?: boolean;
};

export type DataTableCellRenderProps<TData> = {
	data: TData;
	column: DataTableAccessorKeyColumn<TData>;
};
