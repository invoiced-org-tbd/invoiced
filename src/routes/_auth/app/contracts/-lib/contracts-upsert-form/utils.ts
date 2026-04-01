import type { ContractInvoiceRecurrenceItemFormSchema } from './contractsUpsertFormSchemas';

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
