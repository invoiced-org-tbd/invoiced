import { getOrdinalSuffix } from '@/utils/stringUtils';
import { Badge } from '@/components/badge';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';
import { AlertCircleIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';

const SummarySection = ({
	description,
	value,
	missingInformation,
}: {
	description: string;
	value: string;
	missingInformation: boolean;
}) => {
	return (
		<div className='rounded-md border border-border bg-background p-3 space-y-1'>
			<p className='text-xs text-muted-foreground'>{description}</p>
			<p className='text-sm font-medium'>
				{missingInformation ? (
					<span className='text-destructive'>
						<AlertCircleIcon className='size-4' />
					</span>
				) : (
					value
				)}
			</p>
		</div>
	);
};

export const ContractSummary = ({
	data: { general, role, client, autoSendConfiguration },
}: {
	data: ContractsUpsertFormSchema;
}) => {
	const { t } = useTranslate();
	const language = useLanguage((state) => state.language);
	const autoSendSummary = autoSendConfiguration.items
		.map((item) => {
			const dayOfMonth =
				language === 'en'
					? `${item.dayOfMonth}${getOrdinalSuffix(item.dayOfMonth)}`
					: `${item.dayOfMonth}`;

			return t('contracts.summary.autoSend.item', {
				dayOfMonth,
				percentage: item.percentage,
			});
		})
		.join(', ');

	return (
		<section className='rounded-lg border border-border bg-muted/30 p-3 space-y-3'>
			<header className='flex items-center justify-between gap-2'>
				<div className='space-y-1'>
					<h3 className='text-sm font-semibold'>
						{t('contracts.summary.title')}
					</h3>
					<p className='text-xs text-muted-foreground'>
						{t('contracts.summary.description')}
					</p>
				</div>
				<Badge variant='secondary'>{t('contracts.summary.badge')}</Badge>
			</header>

			<div className='space-y-2'>
				<SummarySection
					description={t('contracts.summary.activeContractLabel')}
					value={t('contracts.summary.activeContractValue', {
						companyName: client.companyName,
						roleDescription: role.description,
					})}
					missingInformation={!client.companyName || !role.description}
				/>

				<div className='grid gap-2 sm:grid-cols-2'>
					<SummarySection
						description={t('contracts.summary.contractDescriptionLabel')}
						value={general.description}
						missingInformation={!general.description}
					/>
					<SummarySection
						description={t('contracts.summary.salaryLabel')}
						value={formatCurrency({ value: role.rate })}
						missingInformation={!role.rate}
					/>
				</div>

				<SummarySection
					description={t('contracts.summary.billingLabel')}
					value={t('contracts.summary.billingValue', {
						name: client.responsibleName,
						email: client.responsibleEmail,
					})}
					missingInformation={
						!client.responsibleName || !client.responsibleEmail
					}
				/>

				{autoSendConfiguration.enabled && (
					<SummarySection
						description={t('contracts.summary.autoSend.title')}
						value={t('contracts.summary.autoSend.value', {
							schedule: autoSendSummary,
						})}
						missingInformation={!autoSendSummary}
					/>
				)}
			</div>
		</section>
	);
};
