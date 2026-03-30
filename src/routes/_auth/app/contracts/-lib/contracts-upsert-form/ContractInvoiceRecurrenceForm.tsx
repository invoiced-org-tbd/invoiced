import { Button } from '@/components/button/Button';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { TrashIcon } from 'lucide-react';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';
import { getEmptyContractInvoiceRecurrenceItem } from './contractsUpsertFormSchemas';
import { ToggleSection } from '@/components/toggle-section/ToggleSection';
import {
	getBalancedContractRecurrencePercentages,
	getContractRecurrenceItemsTotalPercentage,
} from './utils';
import { cn } from '@/utils/classNamesUtils';
import { getOrdinalSuffix } from '@/utils/stringUtils';
import { formatCurrency } from '@/utils/currencyUtils';

type ContractInvoiceRecurrenceFormProps = {
	rate: number;
};

export const ContractInvoiceRecurrenceForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['invoiceRecurrence'],
	props: {} as ContractInvoiceRecurrenceFormProps,
	render: ({ group, rate }) => {
		const { t } = useTranslate();

		return (
			<ToggleSection.Root
				open={true}
				variant='secondary'
			>
				<ToggleSection.Header>
					<ToggleSection.Title>
						{t('contracts.form.invoiceRecurrence.sectionTitle')}
					</ToggleSection.Title>
					<ToggleSection.Description>
						{t('contracts.form.invoiceRecurrence.sectionDescription')}
					</ToggleSection.Description>
				</ToggleSection.Header>

				<ToggleSection.Content>
					<group.AppField
						name='items'
						mode='array'
						children={(field) => {
							const handleAddItem = () => {
								const previousItems = field.state.value;
								let nextDayOfMonth =
									Math.max(...previousItems.map((item) => item.dayOfMonth), 0) +
									1;
								if (nextDayOfMonth > 31) {
									nextDayOfMonth = 1;
								}

								const nextItems = [
									...previousItems,
									getEmptyContractInvoiceRecurrenceItem(nextDayOfMonth),
								];
								const balancedPercentages =
									getBalancedContractRecurrencePercentages(nextItems.length);

								field.handleChange(
									nextItems.map((item, index) => {
										const balancedPercentage =
											balancedPercentages.at(index) ?? 0;
										return {
											...item,
											percentage: balancedPercentage,
										};
									}),
								);
							};

							return (
								<section className='flex flex-col gap-2 items-end'>
									<Button
										variant='secondary'
										size='xxs'
										onClick={handleAddItem}
									>
										{t('common.addItem')}
									</Button>

									{field.state.value.map((_, index) => {
										const percentage = field.state.value[index].percentage;
										const percentageValue = (percentage / 100) * (rate || 0);
										const percentageValueFormatted = formatCurrency({
											value: percentageValue,
										});

										return (
											<group.SubSet
												key={index}
												className='flex-row w-full'
											>
												<group.AppField
													name={`items[${index}].dayOfMonth`}
													children={(field) => (
														<field.NumberInput
															label={t(
																'contracts.form.invoiceRecurrence.dayOfMonthLabel',
															)}
															suffix={t(
																'contracts.form.invoiceRecurrence.dayOfMonthSuffix',
																{
																	suffix: getOrdinalSuffix(field.state.value),
																},
															)}
															mode='integer'
														/>
													)}
												/>
												<group.AppField
													name={`items[${index}].percentage`}
													children={(field) => (
														<field.NumberInput
															label={t(
																'contracts.form.invoiceRecurrence.percentageLabel',
															)}
															description={`(${percentageValueFormatted})`}
															mode='percentage'
														/>
													)}
												/>
												<Button
													variant='destructive'
													isIcon={true}
													size='xs'
													onClick={() => field.removeValue(index)}
												>
													<TrashIcon />
												</Button>
											</group.SubSet>
										);
									})}
								</section>
							);
						}}
					/>
				</ToggleSection.Content>

				<group.Subscribe
					selector={(s) => ({
						items: s.values.items,
					})}
					children={({ items }) => {
						const { totalPercentage } =
							getContractRecurrenceItemsTotalPercentage(items);

						const isPercentageValid = totalPercentage === 100;

						return (
							<ToggleSection.Footer>
								<p
									className={cn(
										isPercentageValid ? 'text-primary' : 'text-destructive',
									)}
								>
									{t('contracts.form.invoiceRecurrence.totalPercentageLabel', {
										value: totalPercentage,
									})}
									{isPercentageValid
										? ''
										: ` ${t('contracts.form.invoiceRecurrence.totalPercentageInvalidHint')}`}
								</p>
							</ToggleSection.Footer>
						);
					}}
				/>
			</ToggleSection.Root>
		);
	},
});
