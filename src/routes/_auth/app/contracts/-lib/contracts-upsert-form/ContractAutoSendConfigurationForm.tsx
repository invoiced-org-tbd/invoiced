import { withFieldGroup } from '@/hooks/use-app-form';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';
import { useTranslate } from '@/hooks/use-translate/useTranslate';

const ComingSoon = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className='rounded-lg border border-dashed p-6 space-y-2'>
			<p className='text-sm font-semibold'>{title}</p>
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	);
};

export const ContractAutoSendConfigurationForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['autoSendConfiguration'],
	render: () => {
		const { t } = useTranslate();

		return (
			<ComingSoon
				title={t('contracts.form.autoSendConfiguration.comingSoonTitle')}
				description={t(
					'contracts.form.autoSendConfiguration.comingSoonDescription',
				)}
			/>
		);

		/* return (
			<group.Set>
				<group.AppField
					name='enabled'
					children={(field) => (
						<ToggleSection.Root
							variant='secondary'
							open={field.state.value}
						>
							<ToggleSection.Header>
								<ToggleSection.Title className='flex items-center justify-between'>
									<span className='w-full'>
										{t('contracts.form.autoSendConfiguration.title')}
									</span>
									<field.Switch />
								</ToggleSection.Title>
							</ToggleSection.Header>

							<ToggleSection.Content>
								<group.AppField
									name='items'
									mode='array'
									children={(field) => (
										<group.Group>
											<div className='flex items-center justify-between'>
												<p className='text-sm text-muted-foreground flex flex-col gap-1'>
													<span className='font-medium'>
														{t(
															'contracts.form.autoSendConfiguration.rulesTitle',
														)}
													</span>
													<span className='text-xs'>
														{t(
															'contracts.form.autoSendConfiguration.rulesDescription',
														)}
													</span>
												</p>

												<Button
													variant='secondary'
													size='xxs'
													onClick={() =>
														group.pushFieldValue('items', {
															dayOfMonth: 1,
															percentage: 100,
														})
													}
												>
													{t('common.addItem')}
													<PlusIcon className='size-4' />
												</Button>
											</div>

											{field.state.value.map((_, index) => {
												return (
													<group.SubSet
														key={index}
														className='flex-row items-start'
													>
														<group.AppField
															name={`items[${index}].dayOfMonth`}
															children={(field) => (
																<field.NumberInput
																	label={t(
																		'contracts.form.autoSendConfiguration.dayOfMonthLabel',
																	)}
																	prefix={t(
																		'contracts.form.autoSendConfiguration.dayOfMonthPrefix',
																	)}
																	suffix={`${getOrdinalSuffix(
																		field.state.value,
																	)} ${t('common.day')}`}
																/>
															)}
														/>
														<group.AppField
															name={`items[${index}].percentage`}
															children={(field) => (
																<field.NumberInput
																	label={t(
																		'contracts.form.autoSendConfiguration.percentageLabel',
																	)}
																	mode='percentage'
																/>
															)}
														/>

														<div className='my-auto'>
															<Button
																isIcon={true}
																variant='destructive'
																size='xxs'
																disabled={field.state.value.length === 1}
																tooltip={t('common.removeItem')}
																onClick={() => field.removeValue(index)}
															>
																<TrashIcon className='size-4' />
															</Button>
														</div>
													</group.SubSet>
												);
											})}
										</group.Group>
									)}
								/>
							</ToggleSection.Content>

							<group.Subscribe
								selector={(state) => ({
									items: state.values.items,
									isEnabled: state.values.enabled,
								})}
								children={({ items, isEnabled }) => {
									const totalPercentage = items.reduce(
										(acc, item) => acc + item.percentage,
										0,
									);
									const isPercentageValid = totalPercentage === 100;
									const conflictingDays = items.filter((item, index) =>
										items.some(
											(otherItem, otherIndex) =>
												otherIndex !== index &&
												item.dayOfMonth === otherItem.dayOfMonth,
										),
									);
									const hasError =
										!isPercentageValid || conflictingDays.length > 0;

									return (
										<ToggleSection.Footer>
											{isEnabled ? (
												<p className={cn(hasError ? 'text-destructive' : '')}>
													{conflictingDays.length > 0
														? t(
																'contracts.form.autoSendConfiguration.conflictingDaysLabel',
																{
																	days: conflictingDays
																		.map((item) => item.dayOfMonth)
																		.join(', '),
																},
															)
														: t(
																'contracts.form.autoSendConfiguration.totalLabel',
																{
																	total: totalPercentage,
																},
															)}
												</p>
											) : (
												<p>Configure auto send configuration</p>
											)}
										</ToggleSection.Footer>
									);
								}}
							/>
						</ToggleSection.Root>
					)}
				/>
			</group.Set>
		); */
	},
});
