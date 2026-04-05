import { Card } from '@/components/card/Card';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { formatCurrency } from '@/utils/currencyUtils';
import { formatInvoiceIssueDate } from '@/utils/dateUtils';
import { cn } from '@/utils/classNamesUtils';
import type { PropsWithChildren } from 'react';
import { useTranslate } from '@/hooks/use-translate/useTranslate';

type ContentSectionProps = PropsWithChildren<{
	title: string;
	className?: string;
}>;
const ContentSection = ({
	title,
	className,
	children,
}: ContentSectionProps) => {
	return (
		<section className={cn('space-y-2', className)}>
			<p className='text-xs font-semibold uppercase tracking-wide text-primary-muted'>
				{title}
			</p>
			{children}
		</section>
	);
};

type ContentSectionItemProps = {
	label: string;
	value: string;
};
const ContentSectionItem = ({ label, value }: ContentSectionItemProps) => {
	return (
		<div className='space-y-0.5'>
			<p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
				{label}
			</p>
			<p className='text-sm leading-5 text-foreground'>{value}</p>
		</div>
	);
};

type InvoiceCardContentProps = {
	invoice: GetInvoicesResponse[number];
};
export const InvoiceCardContent = ({ invoice }: InvoiceCardContentProps) => {
	const { t } = useTranslate();
	const totalAmount = invoice.items.reduce((acc, item) => acc + item.amount, 0);
	const totalItemsLabel = `${invoice.items.length} ${
		invoice.items.length === 1
			? t('invoices.list.itemSingular')
			: t('invoices.list.itemPlural')
	}`;

	return (
		<Card.Content className='grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-3'>
			<ContentSection
				title={t('invoices.list.sections.financial')}
				className='h-full'
			>
				<div className='h-full min-h-20 rounded-lg border border-primary/20 bg-primary/5 p-3'>
					<p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
						{t('invoices.list.labels.totalAmount')}
					</p>
					<p className='text-xl font-semibold leading-tight text-primary-muted'>
						{formatCurrency({ value: totalAmount })}
					</p>
					<p className='text-[11px] text-muted-foreground'>{totalItemsLabel}</p>
				</div>
			</ContentSection>

			<ContentSection
				title={t('invoices.list.sections.client')}
				className='h-full'
			>
				<div className='h-full min-h-20 rounded-lg border bg-muted/35 p-3'>
					<ContentSectionItem
						label={t('invoices.list.labels.company')}
						value={invoice.contract.client.companyName}
					/>
				</div>
			</ContentSection>

			<ContentSection
				title={t('invoices.list.sections.issue')}
				className='h-full'
			>
				<div className='h-full min-h-20 rounded-lg border bg-muted/35 p-3'>
					<ContentSectionItem
						label={t('invoices.list.labels.issueDate')}
						value={formatInvoiceIssueDate(invoice.issueDate)}
					/>
				</div>
			</ContentSection>

			<ContentSection
				title={t('invoices.list.sections.items')}
				className='md:col-span-3 md:mt-1'
			>
				{invoice.items.length === 0 && (
					<div className='rounded-lg border border-dashed p-3 text-sm text-muted-foreground'>
						{t('invoices.list.noItems')}
					</div>
				)}

				{invoice.items.length === 1 && (
					<div className='rounded-lg border border-primary/20 bg-primary/5 p-3'>
						<p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
							{t('invoices.list.labels.invoiceItem')}
						</p>
						<div className='flex items-center justify-between gap-4 pt-1.5'>
							<p className='text-sm font-medium text-foreground'>
								{invoice.items[0].description}
							</p>
							<p className='text-base font-semibold text-primary-muted'>
								{formatCurrency({ value: invoice.items[0].amount })}
							</p>
						</div>
					</div>
				)}

				{invoice.items.length > 1 && (
					<div className='space-y-1.5'>
						{invoice.items.map((item) => (
							<div
								key={item.id}
								className='flex items-center justify-between gap-3 rounded-lg border bg-muted/35 px-3 py-2'
							>
								<p className='text-sm text-foreground leading-5'>
									{item.description}
								</p>
								<p className='text-sm font-medium text-primary-muted tabular-nums'>
									{formatCurrency({ value: item.amount })}
								</p>
							</div>
						))}
					</div>
				)}
			</ContentSection>
		</Card.Content>
	);
};
