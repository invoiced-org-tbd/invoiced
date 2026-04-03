import { Button } from '@/components/button/Button';
import { ToggleSection } from '@/components/toggle-section/ToggleSection';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { formatCurrency } from '@/utils/currencyUtils';
import { getOrdinalSuffix } from '@/utils/stringUtils';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';
import { getEmptyContractInvoiceRecurrenceItem } from './contractsUpsertFormSchemas';
import {
	getContractRecurrenceItemsTotalPercentage,
	getContractRecurrenceItemsWithBalancedPercentages,
} from './utils';
import { Switch } from '@/components/switch/Switch';

type ContractInvoiceRecurrenceFormProps = {
	rate: number;
};

export const ContractInvoiceRecurrenceForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['invoiceRecurrence'],
	props: {} as ContractInvoiceRecurrenceFormProps,
	render: ({ group, rate }) => {
		const { t } = useTranslate();
		const [balancePercentage, setBalancePercentage] = useState<
			boolean | undefined
		>(true);

		const handleBalancePercentageChange = (value: boolean | undefined) => {
			if (value) {
				group.setFieldValue(
					'items',
					getContractRecurrenceItemsWithBalancedPercentages(
						group.getFieldValue('items'),
					),
				);
			}

			setBalancePercentage(value);
		};

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
								const previousMaxDayOfMonth = Math.max(
									...previousItems.map((item) => item.dayOfMonth),
									0,
								);
								let nextDayOfMonth = previousMaxDayOfMonth + 1;

								if (nextDayOfMonth > 31) {
									nextDayOfMonth = 1;
								}

								const nextItems = [
									...previousItems,
									getEmptyContractInvoiceRecurrenceItem(nextDayOfMonth),
								];

								if (!balancePercentage) {
									field.handleChange(nextItems);
									return;
								}

								const itemsWithBalancedPercentage =
									getContractRecurrenceItemsWithBalancedPercentages(nextItems);

								field.handleChange(itemsWithBalancedPercentage);
							};

							return (
								<section className='flex flex-col gap-2 items-end'>
									<div className='flex flex-row gap-2 items-center w-full'>
										<Switch
											label={t(
												'contracts.form.invoiceRecurrence.balancePercentagesLabel',
											)}
											tooltip={t(
												'contracts.form.invoiceRecurrence.balancePercentagesTooltip',
											)}
											value={balancePercentage}
											onChange={handleBalancePercentageChange}
										/>

										<Button
											variant='secondary'
											size='xxs'
											onClick={handleAddItem}
										>
											{t('common.addItem')}
										</Button>
									</div>

									{field.state.value.map((_, index) => {
										const percentage = field.state.value[index].percentage;
										const percentageValue = (percentage / 100) * (rate || 0);
										const percentageValueFormatted = formatCurrency({
											value: percentageValue,
										});

										const handleDeleteItem = () => {
											const newItems = field.state.value.filter(
												(_, i) => i !== index,
											);
											field.handleChange(newItems);

											if (!balancePercentage) {
												return;
											}

											const itemsWithBalancedPercentage =
												getContractRecurrenceItemsWithBalancedPercentages(
													newItems,
												);
											field.handleChange(itemsWithBalancedPercentage);
										};

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
													listeners={{
														onBlur: () => {
															setBalancePercentage(false);
														},
													}}
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
													onClick={handleDeleteItem}
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
