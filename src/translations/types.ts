import type { enTranslations } from './en-translations';

export type TranslationDictionary = {
	[key: string]: string | TranslationDictionary;
};

type JoinPath<Start extends string, End extends string> = `${Start}.${End}`;

export type TranslationPath<T extends TranslationDictionary> = {
	[K in keyof T & string]:
		| (T[K] extends string ? K : never)
		| (T[K] extends TranslationDictionary ? JoinPath<K, TranslationPath<T[K]>> : never);
}[keyof T & string];

export type TranslationValueAtPath<
	T extends TranslationDictionary,
	P extends string,
> = P extends `${infer Head}.${infer Tail}`
	? Head extends keyof T
		? T[Head] extends TranslationDictionary
			? TranslationValueAtPath<T[Head], Tail>
			: never
		: never
	: P extends keyof T
		? T[P] extends string
			? T[P]
			: never
		: never;

export type InterpolationKeys<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
	? Param | InterpolationKeys<Rest>
	: never;

export type TranslationParams<T extends string> = [InterpolationKeys<T>] extends [never]
	? never
	: Record<InterpolationKeys<T>, string | number>;

export type TranslationRuntimeParams = Record<string, string | number>;

export type TranslationSchema<T> = {
	[K in keyof T]: T[K] extends string
		? string
		: T[K] extends Record<string, unknown>
			? TranslationSchema<T[K]>
			: never;
};

export type BaseTranslations = typeof enTranslations;
export type TranslationsShape = TranslationSchema<BaseTranslations>;
export type TranslationKey = TranslationPath<BaseTranslations>;
export type TranslationMessage<P extends TranslationKey> = TranslationValueAtPath<
	BaseTranslations,
	P
>;
export type TranslationArguments<P extends TranslationKey> =
	TranslationParams<TranslationMessage<P>> extends never
		? [path: P]
		: [path: P, params: TranslationParams<TranslationMessage<P>>];

export type TranslationFunction = <P extends TranslationKey>(
	...args: TranslationArguments<P>
) => string;
