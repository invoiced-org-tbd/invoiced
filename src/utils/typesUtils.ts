export type WithUserId = {
	userId: string;
};

export type WithId = {
	id: string;
};

export const assertNever = (value: never): never => value;
