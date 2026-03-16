import type { GetContractEditParams } from './getContractEdit';

const baseKey = 'contracts';
export const contractQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey],
	edit: (params: GetContractEditParams) => [baseKey, 'edit', params.id],
};
