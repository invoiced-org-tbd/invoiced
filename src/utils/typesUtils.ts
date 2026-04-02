export const assertNever = (value: never): never => value;

// biome-ignore lint/suspicious/noExplicitAny: function signature is unknown
export type AnyFunction = (...args: any[]) => any;
