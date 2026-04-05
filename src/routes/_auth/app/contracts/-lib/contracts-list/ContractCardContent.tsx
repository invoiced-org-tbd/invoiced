import type { GetContractsResponse } from '@/api/contract/getContracts';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useFormatAddressSingleLine } from '@/utils/addressUtils';
import { cn } from '@/utils/classNamesUtils';
import { formatCurrency } from '@/utils/currencyUtils';
import { getOrdinalSuffix } from '@/utils/stringUtils';
import type { PropsWithChildren } from 'react';

type ContentSectionItemProps = {
	label: string;
	value: string;
};
const ContentSectionItem = ({ label, value }: ContentSectionItemProps) => {
	return (
		<div className='text-sm'>
			<p className='font-medium leading-3'>{label}</p>
			<p className='text-foreground'>{value}</p>
		</div>
	);
};

type ContentSectionProps = PropsWithChildren<{
	title: string;
	className?: string;
}>;
const ContentSection = ({
	children,
	title,
	className,
}: ContentSectionProps) => {
	return (
		<div className={cn('w-full space-y-1 text-muted-foreground', className)}>
			<p className='text-sm font-medium tracking-wide text-primary-muted pb-1'>
				{title}
			</p>

			<div>{children}</div>
		</div>
	);
};

type ContractCardContentProps = {
	contract: GetContractsResponse[number];
};
export const ContractCardContent = ({ contract }: ContractCardContentProps) => {
	const { t } = useTranslate();
	const { fomattedAddress } = useFormatAddressSingleLine();

	return (
		<Card.Content className='grid grid-cols-4 gap-4'>
			<ContentSection
				title={t('contracts.list.financialDetails')}
				className='col-span-1'
			>
				<div>
					<p>{t('contracts.list.monthlyRate')}</p>
					<p className='text-lg font-medium text-primary-muted'>
						{formatCurrency({ value: contract.role.rate })}
					</p>
				</div>
			</ContentSection>

			<ContentSection
				title={t('contracts.list.billingContact')}
				className='col-span-2'
			>
				<div className='space-y-3'>
					<ContentSectionItem
						label={t('common.name')}
						value={contract.client.responsibleName}
					/>
					<ContentSectionItem
						label={t('common.email')}
						value={contract.client.responsibleEmail}
					/>
					<ContentSectionItem
						label={t('contracts.list.addressLabel')}
						value={fomattedAddress({ address: contract.client.address })}
					/>
				</div>
			</ContentSection>

			<ContentSection
				title={t('contracts.list.paymentSchedule')}
				className='col-span-1'
			>
				<section className='space-y-1'>
					{contract.invoiceRecurrence.items.map((recurrenceItem) => {
						const value =
							contract.role.rate * (recurrenceItem.percentage / 100);

						const showPercentage = recurrenceItem.percentage !== 100;

						return (
							<div
								key={recurrenceItem.id}
								className='flex justify-between items-start bg-primary/5 border border-primary/15 p-2 rounded-lg text-sm'
							>
								<div>
									<p className='text-foreground'>
										{t('contracts.list.recurrenceEveryLabel')}{' '}
										<span className='font-medium'>
											{recurrenceItem.dayOfMonth}
										</span>
										{getOrdinalSuffix(recurrenceItem.dayOfMonth)}{' '}
										{t('contracts.list.recurrenceDayLabel')}
									</p>
									<p className='text-primary-muted'>
										{formatCurrency({ value })}
									</p>
								</div>

								{showPercentage && (
									<p className='text-primary-muted'>
										{recurrenceItem.percentage}%
									</p>
								)}
							</div>
						);
					})}
				</section>
			</ContentSection>
		</Card.Content>
	);
};
