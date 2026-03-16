import type { Language } from '@/hooks/use-language/types';
import z from 'zod';
import { translate } from './translate';

type ZodIssue = {
	input?: unknown;
	origin?: unknown;
	minimum?: unknown;
	format?: unknown;
};

const getInvalidTypeMessage = (language: Language, issue: ZodIssue) => {
	if ('input' in issue && (issue.input === undefined || issue.input === null)) {
		return translate(language, 'validation.required');
	}

	return translate(language, 'validation.invalidType');
};

const getTooSmallMessage = (language: Language, issue: ZodIssue) => {
	if (!('origin' in issue) || !('minimum' in issue)) {
		return undefined;
	}

	if (issue.origin !== 'string') {
		return undefined;
	}

	const minimum =
		typeof issue.minimum === 'number'
			? issue.minimum
			: typeof issue.minimum === 'bigint'
				? Number(issue.minimum)
				: undefined;

	if (minimum === undefined) {
		return undefined;
	}

	if (minimum <= 1) {
		return translate(language, 'validation.required');
	}

	return translate(language, 'validation.minCharacters', {
		minimum,
	});
};

const getInvalidFormatMessage = (language: Language, issue: ZodIssue) => {
	if (!('format' in issue) || issue.format !== 'email') {
		return undefined;
	}

	return translate(language, 'validation.invalidEmail');
};

export const setupZodErrorMap = (language: Language) => {
	z.config({
		customError: (issue) => {
			switch (issue.code) {
				case 'invalid_type':
					return getInvalidTypeMessage(language, issue);
				case 'too_small':
					return getTooSmallMessage(language, issue);
				case 'invalid_format':
					return getInvalidFormatMessage(language, issue);
				default:
					return undefined;
			}
		},
	});
};
