import { invoiceConfigurationQueryKeys } from '@/api/invoice-configuration/invoiceConfigurationApiUtils';
import type { InvalidateOnSuccessArgs } from '@/utils/queryOptionsUtils';
import { invalidateOnSuccess } from '@/utils/queryOptionsUtils';
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

export const invalidateContractMutationCaches = (
	args: InvalidateOnSuccessArgs,
) => {
	invalidateOnSuccess({
		args,
		keys: [contractQueryKeys.base()],
	});
	invalidateOnSuccess({
		args,
		keys: [invoiceConfigurationQueryKeys.base()],
	});
};
