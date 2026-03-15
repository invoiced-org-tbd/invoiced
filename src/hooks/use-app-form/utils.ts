export const formatFormInputWrapperErrors = (errors: unknown): string[] => {
	if (Array.isArray(errors)) {
		const messages: string[] = [];

		for (const error of errors) {
			if (typeof error === 'string') {
				messages.push(error);
				continue;
			}

			if (typeof error === 'object' && error !== null && 'message' in error) {
				messages.push(error.message);
				continue;
			}

			const message = String(error);
			if (!message) {
				continue;
			}

			messages.push(message);
		}

		return messages;
	}

	return [];
};
