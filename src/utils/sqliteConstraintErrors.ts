const collectMessages = (error: unknown): string => {
	if (error instanceof Error) {
		const causeMsg =
			error.cause instanceof Error ? ` ${error.cause.message}` : '';
		return `${error.message}${causeMsg}`;
	}
	if (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as { message: unknown }).message === 'string'
	) {
		return (error as { message: string }).message;
	}
	return '';
};

export const isSqliteForeignKeyConstraintError = (error: unknown): boolean => {
	const text = collectMessages(error).toUpperCase();
	return (
		text.includes('FOREIGN KEY') ||
		text.includes('SQLITE_CONSTRAINT_FOREIGNKEY') ||
		text.includes('787')
	);
};
