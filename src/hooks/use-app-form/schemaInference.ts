import type { BaseFieldInputProps } from '@/components/base-field/types';
import type { CheckboxProps } from '@/components/checkbox/types';
import type { MultiSelectInputProps } from '@/components/multi-select-input/types';
import type { NumberInputProps } from '@/components/number-input/types';
import type { SelectInputProps } from '@/components/select-input/types';
import type { SwitchProps } from '@/components/switch/types';
import type { TextInputProps } from '@/components/text-input/types';
import {
	ZodArray,
	ZodBoolean,
	ZodCatch,
	ZodDefault,
	ZodEmail,
	ZodEnum,
	ZodLiteral,
	ZodNullable,
	ZodNumber,
	ZodObject,
	ZodOptional,
	ZodPipe,
	ZodString,
	ZodURL,
	ZodUUID,
} from 'zod';

export type FormInputPropsByMode = {
	text: TextInputProps;
	number: NumberInputProps;
	select: SelectInputProps;
	'multi-select': MultiSelectInputProps;
	checkbox: CheckboxProps;
	switch: SwitchProps;
};
export type FormInputWrapperMode = keyof FormInputPropsByMode;

type ParseableSchema = {
	safeParse: (value: unknown) => { success: boolean };
};

type FormInputResolverParams = {
	baseProps: BaseFieldInputProps<unknown>;
	fieldSchema: ParseableSchema;
};

type FormInputResolver<TMode extends FormInputWrapperMode> = (
	params: FormInputResolverParams,
) =>
	| BaseFieldInputProps<unknown>
	| (BaseFieldInputProps<unknown> & Partial<FormInputPropsByMode[TMode]>);

type FieldPathSegment = string | number;

const isParseableSchema = (value: unknown): value is ParseableSchema => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'safeParse' in value &&
		typeof value.safeParse === 'function'
	);
};

const unwrapSchema = (schema: ParseableSchema) => {
	let unwrappedSchema: unknown = schema;

	while (
		unwrappedSchema instanceof ZodOptional ||
		unwrappedSchema instanceof ZodNullable ||
		unwrappedSchema instanceof ZodDefault ||
		unwrappedSchema instanceof ZodCatch
	) {
		unwrappedSchema = unwrappedSchema.unwrap();
	}

	return unwrappedSchema;
};

const normalizeSchema = (schema: ParseableSchema) => {
	let normalizedSchema: unknown = unwrapSchema(schema);

	while (normalizedSchema instanceof ZodPipe) {
		normalizedSchema = normalizedSchema.in;
	}

	return normalizedSchema;
};

const isOptionalSchema = (
	schema: ParseableSchema,
	emptyValue: unknown = undefined,
) => {
	return schema.safeParse(emptyValue).success;
};

const safeAllows = (schema: ParseableSchema, value: unknown) => {
	return schema.safeParse(value).success;
};

const toFieldPathSegments = (fieldPath: string): FieldPathSegment[] => {
	const segments: FieldPathSegment[] = [];
	const matches = fieldPath.matchAll(/[^.[\]]+|\[(\d+)\]/g);

	for (const match of matches) {
		const [rawMatch, arrayIndex] = match;
		if (arrayIndex !== undefined) {
			segments.push(Number(arrayIndex));
			continue;
		}

		segments.push(rawMatch);
	}

	return segments;
};

export const getLeafFieldName = (fieldPath: string) => {
	const segments = toFieldPathSegments(fieldPath);
	const leafSegment = [...segments].reverse().find((segment) => {
		return typeof segment === 'string';
	});

	if (typeof leafSegment === 'string') {
		return leafSegment;
	}

	return fieldPath;
};

const resolveSchemaAtPath = (
	rootSchema: ParseableSchema,
	fieldPath: string,
): ParseableSchema | null => {
	const pathSegments = toFieldPathSegments(fieldPath);
	let currentSchema: unknown = rootSchema;

	for (const segment of pathSegments) {
		if (!isParseableSchema(currentSchema)) {
			return null;
		}

		currentSchema = normalizeSchema(currentSchema);

		if (typeof segment === 'number') {
			if (!(currentSchema instanceof ZodArray)) {
				return null;
			}

			currentSchema = currentSchema.element;
			continue;
		}

		if (!(currentSchema instanceof ZodObject)) {
			return null;
		}

		currentSchema = currentSchema.shape[segment];
	}

	if (!isParseableSchema(currentSchema)) {
		return null;
	}

	return currentSchema;
};

const findLeafSchemas = (
	rootSchema: ParseableSchema,
	leafName: string,
): ParseableSchema[] => {
	const matches: ParseableSchema[] = [];
	const stack: unknown[] = [rootSchema];

	while (stack.length > 0) {
		const currentSchema = stack.pop();
		if (!isParseableSchema(currentSchema)) {
			continue;
		}

		const normalizedSchema = normalizeSchema(currentSchema);

		if (normalizedSchema instanceof ZodArray) {
			stack.push(normalizedSchema.element);
			continue;
		}

		if (!(normalizedSchema instanceof ZodObject)) {
			continue;
		}

		for (const [key, childSchema] of Object.entries(normalizedSchema.shape)) {
			if (key === leafName && isParseableSchema(childSchema)) {
				matches.push(childSchema);
			}
			stack.push(childSchema);
		}
	}

	return matches;
};

const resolveUniqueLeafSchema = (
	rootSchema: ParseableSchema,
	leafName: string,
): ParseableSchema | null => {
	const matches = findLeafSchemas(rootSchema, leafName);
	if (matches.length !== 1) {
		return null;
	}

	return matches[0];
};

export const resolveFieldSchema = (
	rootSchema: ParseableSchema,
	fieldPath: string,
	leafName: string,
) => {
	return (
		resolveSchemaAtPath(rootSchema, fieldPath) ??
		resolveUniqueLeafSchema(rootSchema, leafName)
	);
};

const resolveTextProps: FormInputResolver<'text'> = ({
	baseProps,
	fieldSchema,
}) => {
	const normalizedSchema = normalizeSchema(fieldSchema);
	const isEmail = normalizedSchema instanceof ZodEmail;
	const isURL = normalizedSchema instanceof ZodURL;
	const isUUID = normalizedSchema instanceof ZodUUID;
	const isString = normalizedSchema instanceof ZodString;

	if (!isEmail && !isURL && !isUUID && !isString) {
		return baseProps;
	}

	const { minLength, maxLength } = normalizedSchema as ZodString;
	const isOptional = isOptionalSchema(fieldSchema, '');

	return {
		...baseProps,
		inputMode: isEmail ? 'email' : isURL ? 'url' : 'text',
		type: isEmail ? 'email' : isURL ? 'url' : 'text',
		required: !isOptional,
		minLength: minLength ?? undefined,
		maxLength: maxLength ?? undefined,
	};
};

const resolveNumberProps: FormInputResolver<'number'> = ({
	baseProps,
	fieldSchema,
}) => {
	const normalizedSchema = normalizeSchema(fieldSchema);
	if (!(normalizedSchema instanceof ZodNumber)) {
		return baseProps;
	}

	const { minValue, maxValue } = normalizedSchema;
	const isOptional = isOptionalSchema(fieldSchema);

	return {
		...baseProps,
		required: !isOptional,
		min: minValue ?? undefined,
		max: maxValue ?? undefined,
	};
};

const resolveSelectProps: FormInputResolver<'select'> = ({
	baseProps,
	fieldSchema,
}) => {
	const normalizedSchema = normalizeSchema(fieldSchema);
	const isString = normalizedSchema instanceof ZodString;
	const isEnum = normalizedSchema instanceof ZodEnum;
	const isLiteral = normalizedSchema instanceof ZodLiteral;

	if (!isString && !isEnum && !isLiteral) {
		return baseProps;
	}

	const isOptional = isOptionalSchema(fieldSchema);
	const minLength = isString ? normalizedSchema.minLength : null;
	const isRequiredByMinLength = !!minLength && minLength > 0;
	const isRequired = !isOptional || isRequiredByMinLength;

	return {
		...baseProps,
		required: isRequired,
		allowEmpty: !isRequired,
	};
};

const resolveMultiSelectProps: FormInputResolver<'multi-select'> = ({
	baseProps,
	fieldSchema,
}) => {
	const normalizedSchema = normalizeSchema(fieldSchema);
	if (!(normalizedSchema instanceof ZodArray)) {
		return baseProps;
	}

	const isOptional = isOptionalSchema(fieldSchema);
	const allowsEmpty = safeAllows(fieldSchema, []);
	const isRequired = !isOptional && !allowsEmpty;

	return {
		...baseProps,
		required: isRequired,
	};
};

const resolveBooleanProps = ({
	baseProps,
	fieldSchema,
}: FormInputResolverParams) => {
	const normalizedSchema = normalizeSchema(fieldSchema);
	const isBoolean = normalizedSchema instanceof ZodBoolean;
	const isBooleanLiteral =
		normalizedSchema instanceof ZodLiteral &&
		[...normalizedSchema.values].every((value) => typeof value === 'boolean');

	if (!isBoolean && !isBooleanLiteral) {
		return baseProps;
	}

	const isOptional = isOptionalSchema(fieldSchema);
	const allowsFalse = safeAllows(fieldSchema, false);
	const isRequired = !isOptional && !allowsFalse;

	return {
		...baseProps,
		required: isRequired,
	};
};

export const modeResolvers = {
	text: resolveTextProps,
	number: resolveNumberProps,
	select: resolveSelectProps,
	'multi-select': resolveMultiSelectProps,
	checkbox: resolveBooleanProps,
	switch: resolveBooleanProps,
} satisfies { [TMode in FormInputWrapperMode]: FormInputResolver<TMode> };
