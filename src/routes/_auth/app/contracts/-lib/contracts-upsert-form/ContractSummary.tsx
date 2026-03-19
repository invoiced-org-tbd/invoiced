import { Badge } from '@/components/badge';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/currencyUtils';
import { getOrdinalSuffix } from '@/utils/stringUtils';
import { AlertCircleIcon } from 'lucide-react';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

const SummarySection = ({
	description,
	value,
	missingInformation,
	className,
}: {
	description: string;
	value: string;
	missingInformation: boolean;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				'rounded-md border border-border bg-background p-3 space-y-1',
				className,
			)}
		>
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
	data: { role, client, autoSendConfiguration },
}: {
	data: ContractsUpsertFormSchema;
}) => {
	const { t } = useTranslate();
	const language = useLanguage((state) => state.language);
	const hasRate = !!role.rate;
	const autoSendSummary = autoSendConfiguration.items
		.map((item) => {
			const dayOfMonth =
				language === 'en'
					? `${item.dayOfMonth}${getOrdinalSuffix(item.dayOfMonth)}`
					: `${item.dayOfMonth}`;
			const value = hasRate
				? formatCurrency({
						value: role.rate * (item.percentage / 100),
					})
				: '';

			return t('contracts.summary.autoSend.item', {
				dayOfMonth,
				value,
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

				{/* TODO: fix responsive layout for large client names/emails */}
				<div className='flex gap-2 flex-nowrap overflow-hidden'>
					<SummarySection
						description={t('contracts.summary.billingLabel')}
						value={t('contracts.summary.billingValue', {
							name: client.responsibleName,
							email: client.responsibleEmail,
						})}
						missingInformation={
							!client.responsibleName || !client.responsibleEmail
						}
						className='h-fit'
					/>

					<SummarySection
						description={t('contracts.summary.salaryLabel')}
						value={formatCurrency({ value: role.rate })}
						missingInformation={!role.rate}
						className='px-4 shrink-0'
					/>
				</div>

				{autoSendConfiguration.enabled && (
					<SummarySection
						description={t('contracts.summary.autoSend.title')}
						value={t('contracts.summary.autoSend.value', {
							schedule: autoSendSummary,
						})}
						missingInformation={!autoSendSummary || !hasRate}
					/>
				)}
			</div>
		</section>
	);
};
