import type { InvoicePDFData } from '@/components/invoice-pdf/types';
import { useCompany } from '@/hooks/use-company/useCompany';
import { assertCompany } from '@/utils/typesUtils';
import { startOfToday } from 'date-fns';
import type {
	ContractInvoiceRecurrenceItemFormSchema,
	ContractsUpsertFormSchema,
} from './contractsUpsertFormSchemas';

export const getContractRecurrenceItemsConflictingDays = (
	items: ContractInvoiceRecurrenceItemFormSchema[],
) => {
	const conflictingDays: number[] = [];
	const conflictingIndexes = new Set<number>();

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		const item = items[itemIndex];
		for (
			let otherItemIndex = 0;
			otherItemIndex < items.length;
			otherItemIndex++
		) {
			const otherItem = items[otherItemIndex];
			if (item === otherItem) {
				continue;
			}

			if (item.dayOfMonth === otherItem.dayOfMonth) {
				conflictingDays.push(item.dayOfMonth);
				conflictingIndexes.add(itemIndex);
				conflictingIndexes.add(otherItemIndex);
			}
		}
	}

	return {
		conflictingDays,
		conflictingIndexes: Array.from(conflictingIndexes),
	};
};

export const getContractRecurrenceItemsTotalPercentage = (
	items: ContractInvoiceRecurrenceItemFormSchema[],
) => {
	let totalPercentage = 0;

	for (const item of items) {
		totalPercentage += item.percentage;
	}
	return { totalPercentage };
};

export const getContractRecurrenceItemsWithBalancedPercentages = (
	items: ContractInvoiceRecurrenceItemFormSchema[],
) => {
	const totalItems = items.length;
	const percentagePerItem = 100 / totalItems;
	// in scenario where percentagePerItem is not a whole number, we need to distribute the remainder evenly between the items
	const remainder = 100 % totalItems;
	const remainderPerItem = remainder / totalItems;

	return items.map((item, index) => ({
		...item,
		percentage: Math.round(
			percentagePerItem + (index < remainder ? remainderPerItem : 0),
		),
	}));
};

export const useContractPreviewToInvoicePDFData = () => {
	const { company } = useCompany();

	const toInvoicePDFData = (
		contract: ContractsUpsertFormSchema,
	): InvoicePDFData => {
		assertCompany(company);

		return {
			from: {
				name: company.name,
				address: company.address,
				email: company.email,
			},
			to: {
				name: contract.client.companyName,
				address: contract.client.address,
				email: contract.client.responsibleEmail,
			},
			items: [
				{
					description: contract.role.description,
					rate: contract.role.rate,
				},
			],
			issueDate: startOfToday(),
			invoiceNumber: 1,
		};
	};

	return {
		toInvoicePDFData,
	};
};
