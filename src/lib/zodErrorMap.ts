import { getT } from '@/utils/languageUtils';
import z from 'zod';

type ZodIssue = {
	input?: unknown;
	origin?: unknown;
	minimum?: unknown;
	maximum?: unknown;
	format?: unknown;
};

const getInvalidTypeMessage = (issue: ZodIssue) => {
	const t = getT();

	if ('input' in issue && (issue.input === undefined || issue.input === null)) {
		return t('validation.required');
	}

	return t('validation.invalidType');
};

const getTooSmallMessage = (issue: ZodIssue) => {
	if (!('origin' in issue) || !('minimum' in issue)) {
		return undefined;
	}

	if (issue.origin !== 'string' && issue.origin !== 'number') {
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

	const t = getT();

	if (issue.origin === 'string' && minimum <= 1) {
		return t('validation.required');
	}

	if (issue.origin === 'string') {
		return t('validation.minCharacters', {
			minimum,
		});
	}

	return t('validation.minNumber', {
		minimum,
	});
};

const getInvalidFormatMessage = (issue: ZodIssue) => {
	if (!('format' in issue) || issue.format !== 'email') {
		return undefined;
	}
	const t = getT();

	return t('validation.invalidEmail');
};

const getTooBigMessage = (issue: ZodIssue) => {
	if (!('origin' in issue) || !('maximum' in issue)) {
		return undefined;
	}

	const maximum =
		typeof issue.maximum === 'number'
			? issue.maximum
			: typeof issue.maximum === 'bigint'
				? Number(issue.maximum)
				: undefined;

	if (maximum === undefined) {
		return undefined;
	}

	const t = getT();

	if (issue.origin === 'string') {
		return t('validation.maxCharacters', {
			maximum,
		});
	}

	if (issue.origin === 'number') {
		return t('validation.maxNumber', {
			maximum,
		});
	}

	return undefined;
};

export const setupZodErrorMap = () => {
	z.config({
		customError: (issue) => {
			switch (issue.code) {
				case 'invalid_type':
					return getInvalidTypeMessage(issue);
				case 'too_small':
					return getTooSmallMessage(issue);
				case 'too_big':
					return getTooBigMessage(issue);
				case 'invalid_format':
					return getInvalidFormatMessage(issue);
				default:
					return undefined;
			}
		},
	});
};
