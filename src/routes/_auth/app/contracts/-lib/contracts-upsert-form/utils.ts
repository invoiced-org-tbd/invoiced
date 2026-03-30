import type { ContractInvoiceRecurrenceItemFormSchema } from './contractsUpsertFormSchemas';

export const getContractRecurrenceItemsConflictingDays = (
	items: ContractInvoiceRecurrenceItemFormSchema[],
) => {
	const conflictingDays: number[] = [];
	const conflictingIndexes = new Set<number>();

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		for (let j = 0; j < items.length; j++) {
			const otherItem = items[j];
			if (item === otherItem) {
				continue;
			}

			if (item.dayOfMonth === otherItem.dayOfMonth) {
				conflictingDays.push(item.dayOfMonth);
				conflictingIndexes.add(i);
				conflictingIndexes.add(j);
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

export const getBalancedContractRecurrencePercentages = (
	itemsCount: number,
) => {
	if (itemsCount <= 0) {
		return [];
	}

	const totalBasisPoints = 100 * 100;
	const baseBasisPoints = Math.floor(totalBasisPoints / itemsCount);
	const remainderBasisPoints = totalBasisPoints % itemsCount;

	return Array.from({ length: itemsCount }, (_, index) => {
		const itemBasisPoints =
			baseBasisPoints + (index < remainderBasisPoints ? 1 : 0);
		return itemBasisPoints / 100;
	});
};
