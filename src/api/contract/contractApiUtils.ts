import type { GetEditContractParams } from './getEditContract';

const baseKey = 'contracts';
export const contractQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey],
	getEditContract: (params: GetEditContractParams) => [
		baseKey,
		'getEditContract',
		params.id,
	],
};
