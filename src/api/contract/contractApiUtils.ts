import type { GetEditContractByIdParams } from './getEditContractById';

const baseKey = 'contracts';
export const contractQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey],
	getById: (params: GetEditContractByIdParams) => [
		baseKey,
		'getById',
		params.id,
	],
};
