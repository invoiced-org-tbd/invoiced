import type { GetContractEditParams } from './getContractEdit';
import type { GetEditContractByIdParams } from './getEditContractById';

const baseKey = 'contracts';
export const contractQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey],
	edit: (params: GetContractEditParams) => [baseKey, 'edit', params.id],
	getById: (params: GetEditContractByIdParams) => [
		baseKey,
		'getById',
		params.id,
	],
};
