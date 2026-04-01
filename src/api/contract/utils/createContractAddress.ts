import '@tanstack/react-start/server-only';

import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import { contractClientAddressTable } from '@/db/tables/contractClientAddressTable';
import type { Tx } from '@/db/types';

type CreateContractAddressParams = {
	tx: Tx;
	contractClientId: string;
	address: ContractsUpsertFormSchema['client']['address'];
};
export const createContractAddress = async ({
	tx,
	contractClientId,
	address,
}: CreateContractAddressParams) => {
	await tx.insert(contractClientAddressTable).values({
		contractClientId,
		street1: address.street1,
		street2: address.street2 || null,
		number: address.number,
		postalCode: address.postalCode,
		city: address.city,
		state: address.state,
		country: address.country,
	});
};
