import { getInvoiceFileName } from '@/api/invoice-configuration/utils/getInvoiceFileName';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { invoiceConfigurationTable } from '@/db/tables/invoiceConfigurationTable';
import type { InferSelectModel } from 'drizzle-orm';

type InvoiceConfigurationRow = InferSelectModel<
	typeof invoiceConfigurationTable
>;

type InvoiceConfigurationProfileProps = {
	invoiceConfiguration: InvoiceConfigurationRow;
	onEditClick: () => void;
};

export const InvoiceConfigurationProfile = ({
	invoiceConfiguration,
	onEditClick,
}: InvoiceConfigurationProfileProps) => {
	const { t } = useTranslate();
	const { company } = useCompany();

	const companyName =
		company?.name ?? t('settings.tabs.invoice.previewCompanyPlaceholder');

	const { invoiceFileName } = getInvoiceFileName({
		invoiceConfiguration,
		companyName,
		date: new Date(),
	});

	const empty = t('settings.tabs.invoice.profile.emptyText');
	const rawSuffix = invoiceConfiguration.suffix ?? '';
	const suffixDisplay = rawSuffix.trim() !== '' ? rawSuffix : empty;

	const yes = t('common.yes');
	const no = t('common.no');

	const numberingSummary =
		invoiceConfiguration.lastInvoiceNumber === 0
			? t('contracts.invoiceConfigurationSetup.numberingNewTabHint')
			: `${t('contracts.invoiceConfigurationSetup.lastInvoiceNumberLabel')}: ${invoiceConfiguration.lastInvoiceNumber}`;

	return (
		<Card.Root className='overflow-hidden border-primary/20'>
			<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
				<div className='space-y-1'>
					<Card.Title>{t('settings.tabs.invoice.profile.title')}</Card.Title>
					<Card.Description>
						{t('settings.tabs.invoice.profile.description')}
					</Card.Description>
				</div>
				<Button
					size='sm'
					variant='secondary'
					onClick={onEditClick}
				>
					{t('common.edit')}
				</Button>
			</Card.Header>

			<Card.Content className='grid gap-4 pt-6 md:grid-cols-2'>
				<div className='rounded-lg border p-4'>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('contracts.invoiceConfigurationSetup.prefixLabel')}
					</p>
					<p className='mt-1 text-sm font-medium'>
						{invoiceConfiguration.prefix}
					</p>
				</div>

				<div className='rounded-lg border p-4'>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('contracts.invoiceConfigurationSetup.suffixLabel')}
					</p>
					<p className='mt-1 text-sm font-medium'>{suffixDisplay}</p>
				</div>

				<div className='rounded-lg border p-4 md:col-span-2'>
					<p className='text-muted-foreground mb-3 text-xs font-medium uppercase tracking-wide'>
						{t('contracts.invoiceConfigurationSetup.includeSectionTitle')}
					</p>
					<ul className='text-sm grid gap-2 sm:grid-cols-2'>
						<li>
							<span className='text-muted-foreground'>
								{t('contracts.invoiceConfigurationSetup.withYearLabel')}:{' '}
							</span>
							{invoiceConfiguration.withYear ? yes : no}
						</li>
						<li>
							<span className='text-muted-foreground'>
								{t('contracts.invoiceConfigurationSetup.withMonthLabel')}:{' '}
							</span>
							{invoiceConfiguration.withMonth ? yes : no}
						</li>
						<li>
							<span className='text-muted-foreground'>
								{t('contracts.invoiceConfigurationSetup.withDayLabel')}:{' '}
							</span>
							{invoiceConfiguration.withDay ? yes : no}
						</li>
						<li>
							<span className='text-muted-foreground'>
								{t('contracts.invoiceConfigurationSetup.withCompanyNameLabel')}:{' '}
							</span>
							{invoiceConfiguration.withCompanyName ? yes : no}
						</li>
					</ul>
				</div>

				<div className='rounded-lg border bg-muted/40 p-4 md:col-span-2'>
					<p className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>
						{t('contracts.invoiceConfigurationSetup.previewCaption')}
					</p>
					<p className='mt-1 break-all font-mono text-sm'>
						{invoiceFileName || empty}
					</p>
				</div>

				<div className='rounded-lg border p-4 md:col-span-2'>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('contracts.invoiceConfigurationSetup.numberingSectionTitle')}
					</p>
					<p className='mt-1 text-sm font-medium leading-relaxed'>
						{numberingSummary}
					</p>
				</div>
			</Card.Content>
		</Card.Root>
	);
};
