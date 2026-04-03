import type { ContractInvoiceRecurrenceItemFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import { addMonths, setDay, startOfToday } from 'date-fns';

type GetClosestFutureRecurrenceItemParams<
	T extends ContractInvoiceRecurrenceItemFormSchema,
> = {
	recurrenceItems: T[];
};

export const getClosestFutureRecurrenceItem = <
	T extends ContractInvoiceRecurrenceItemFormSchema,
>({
	recurrenceItems,
}: GetClosestFutureRecurrenceItemParams<T>) => {
	const today = new Date();
	const todayDayOfMonth = today.getDate();

	const sortedRecurrenceItems = [...recurrenceItems].sort(
		(a, b) => a.dayOfMonth - b.dayOfMonth,
	);

	const closestRecurrenceItem =
		sortedRecurrenceItems.find(
			(recurrenceItem) => recurrenceItem.dayOfMonth >= todayDayOfMonth,
		) ?? sortedRecurrenceItems[0];

	return { closestRecurrenceItem };
};

type GetRecurrenceItemDateParams<
	T extends ContractInvoiceRecurrenceItemFormSchema,
> = {
	recurrenceItem: T;
};
export const getRecurrenceItemDate = <
	T extends ContractInvoiceRecurrenceItemFormSchema,
>({
	recurrenceItem,
}: GetRecurrenceItemDateParams<T>) => {
	const today = startOfToday();
	const isNextMonth = recurrenceItem.dayOfMonth > today.getDate();
	const recurrenceDate = isNextMonth
		? setDay(today, recurrenceItem.dayOfMonth)
		: setDay(addMonths(today, 1), recurrenceItem.dayOfMonth);

	return { recurrenceDate };
};
