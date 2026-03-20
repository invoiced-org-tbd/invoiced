import { Badge } from '@/components/badge';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { formatCurrency } from '@/utils/currencyUtils';
import { getOrdinalSuffix } from '@/utils/stringUtils';
import { motion } from 'framer-motion';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

const SummaryItem = ({
	label,
	value,
	placeholder,
	hint,
	isMissing,
	className,
}: {
	label: string;
	value: string;
	placeholder: string;
	hint?: string;
	isMissing: boolean;
	className?: string;
}) => {
	return (
		<div className={cn('space-y-1.5 py-2.5', className)}>
			<p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
				{label}
			</p>

			<p
				className={cn(
					'text-sm leading-relaxed',
					isMissing ? 'text-muted-foreground italic' : 'font-medium',
				)}
			>
				{isMissing ? placeholder : value}
			</p>

			{hint ? <p className='text-xs text-muted-foreground'>{hint}</p> : null}
		</div>
	);
};

const SummarySkeleton = () => {
	return (
		<div className='rounded-md border border-border bg-background p-3.5 space-y-3.5'>
			<div className='space-y-2'>
				<div className='h-2.5 w-24 rounded bg-muted animate-pulse' />
				<div className='h-3.5 w-full rounded bg-muted animate-pulse' />
				<div className='h-3.5 w-4/5 rounded bg-muted animate-pulse' />
			</div>

			<div className='h-px w-full bg-border/80' />

			<div className='space-y-2'>
				<div className='h-2.5 w-20 rounded bg-muted animate-pulse' />
				<div className='h-3.5 w-3/4 rounded bg-muted animate-pulse' />
			</div>

			<div className='h-px w-full bg-border/80' />

			<div className='space-y-2'>
				<div className='h-2.5 w-16 rounded bg-muted animate-pulse' />
				<div className='h-3.5 w-28 rounded bg-muted animate-pulse' />
			</div>
		</div>
	);
};

export const ContractSummary = ({
	isLoading = false,
	data: { role, client, autoSendConfiguration },
}: {
	isLoading?: boolean;
	data: ContractsUpsertFormSchema;
}) => {
	const { t } = useTranslate();
	const language = useLanguage((state) => state.language);
	const hasRate = !!role.rate;
	const hasActiveContractInfo = !!client.companyName && !!role.description;
	const hasBillingInfo = !!client.responsibleName && !!client.responsibleEmail;
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
		<section className='rounded-lg border border-border bg-muted/30 p-3.5 space-y-3'>
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

			{isLoading ? (
				<SummarySkeleton />
			) : (
				<div className='rounded-md border border-border bg-background px-3.5 py-1.5'>
					<SummaryItem
						label={t('contracts.summary.activeContractLabel')}
						value={t('contracts.summary.activeContractValue', {
							companyName: client.companyName,
							roleDescription: role.description,
						})}
						placeholder={t('contracts.summary.activeContractMissing')}
						hint={
							hasActiveContractInfo
								? undefined
								: t('contracts.summary.missingInformationHint')
						}
						isMissing={!hasActiveContractInfo}
						className='border-b border-border/80'
					/>

					<SummaryItem
						label={t('contracts.summary.billingLabel')}
						value={t('contracts.summary.billingValue', {
							name: client.responsibleName,
							email: client.responsibleEmail,
						})}
						placeholder={t('contracts.summary.billingMissing')}
						hint={
							hasBillingInfo
								? undefined
								: t('contracts.summary.missingInformationHint')
						}
						isMissing={!hasBillingInfo}
						className='border-b border-border/80'
					/>

					<SummaryItem
						label={t('contracts.summary.salaryLabel')}
						value={formatCurrency({ value: role.rate })}
						placeholder={t('contracts.summary.salaryMissing')}
						hint={
							!hasRate
								? t('contracts.summary.missingInformationHint')
								: undefined
						}
						isMissing={!hasRate}
					/>

					{autoSendConfiguration.enabled ? (
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.18, ease: 'easeOut' }}
							className='border-t border-border/80'
						>
							<SummaryItem
								label={t('contracts.summary.autoSend.title')}
								value={t('contracts.summary.autoSend.value', {
									schedule: autoSendSummary,
								})}
								placeholder={t('contracts.summary.autoSend.missing')}
								hint={
									!autoSendSummary || !hasRate
										? t('contracts.summary.missingInformationHint')
										: undefined
								}
								isMissing={!autoSendSummary || !hasRate}
							/>
						</motion.div>
					) : null}
				</div>
			)}
		</section>
	);
};
