type IssueLike = {
	path?: unknown;
};

const getErrorSource = (errors: unknown): Record<string, unknown> => {
	const source = Array.isArray(errors) ? errors[0] : errors;

	if (source && typeof source === 'object') {
		return source as Record<string, unknown>;
	}

	return {};
};

const matchesScopeFromKey = (key: string, scope: string) => {
	if (
		key === scope ||
		key.startsWith(`${scope}.`) ||
		key.startsWith(`${scope}[`)
	) {
		return true;
	}

	const paths = key.split('.');
	if (paths.length < 2) {
		return false;
	}

	const scopeIndex = paths.indexOf(scope);
	return scopeIndex !== -1 && scopeIndex < paths.length - 1;
};

const matchesScopeFromIssues = (issues: unknown, scope: string) => {
	if (!Array.isArray(issues)) {
		return false;
	}

	return issues.some((issue) => {
		const maybeIssue = issue as IssueLike;
		if (!Array.isArray(maybeIssue.path) || maybeIssue.path.length < 2) {
			return false;
		}

		const [firstSegment] = maybeIssue.path;
		return String(firstSegment) === scope;
	});
};

export const getScopedErrorKeys = (errors: unknown, scope: string) => {
	const errorSource = getErrorSource(errors);
	const matchedKeys: string[] = [];

	for (const key in errorSource) {
		const value = errorSource[key];
		const matchesScope =
			matchesScopeFromKey(key, scope) || matchesScopeFromIssues(value, scope);

		if (matchesScope) {
			matchedKeys.push(key);
		}
	}

	return matchedKeys;
};
