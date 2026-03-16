import { withFieldGroup } from '@/hooks/use-app-form';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { Button } from '@/components/button';
import { PlusIcon, TrashIcon } from 'lucide-react';

export const ContractAutoSendConfigurationForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['autoSendConfiguration'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Group>
				<p>{t('contracts.autoSendConfiguration.title')}</p>

				<group.AppField
					name='enabled'
					children={(field) => (
						<field.Switch
							label={t('contracts.autoSendConfiguration.enabled')}
						/>
					)}
				/>
				<group.AppField
					name='items'
					mode='array'
					children={(field) => (
						<section>
							{field.state.value.map((_, index) => {
								return (
									<div key={index}>
										<group.AppField
											name={`items[${index}].dayOfMonth`}
											children={(field) => (
												<field.NumberInput
													label={t(
														'contracts.autoSendConfiguration.dayOfMonth',
													)}
												/>
											)}
										/>
										<group.AppField
											name={`items[${index}].percentage`}
											children={(field) => (
												<field.NumberInput
													label={t(
														'contracts.autoSendConfiguration.percentage',
													)}
													mode='percentage'
												/>
											)}
										/>
										<Button
											isIcon={true}
											variant='destructive'
											size='xxs'
											tooltip={t('common.removeItem')}
											onClick={() => field.removeValue(index)}
										>
											<TrashIcon className='size-4' />
										</Button>
									</div>
								);
							})}

							<Button
								variant='secondary'
								size='xxs'
								onClick={() =>
									field.pushValue({
										dayOfMonth: 1,
										percentage: 100,
									})
								}
							>
								{t('common.addItem')}
								<PlusIcon className='size-4' />
							</Button>
						</section>
					)}
				/>
			</group.Group>
		);
	},
});
