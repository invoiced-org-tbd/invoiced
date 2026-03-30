import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { DataTable } from '@/components/data-table/DataTable';
import type { DataTableColumn } from '@/components/data-table/types';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { PencilIcon } from 'lucide-react';

type BillingStatus = 'paid' | 'processing' | 'pending' | 'failed';

type BillingHistoryRow = {
	period: string;
	invoiceId: string;
	issuedAt: string;
	amountInCents: number;
	status: BillingStatus;
};

const selectedPaymentMethod = {
	brand: 'Visa',
	last4: '4242',
	holderName: 'Dalton Silva',
	expiresAt: '12/2027',
};

const selectedPlan = {
	name: 'Pro',
	priceInCents: 3900,
	interval: 'month',
	renewalDate: '2026-04-01',
};

// TODO: Replace local billing data with a query hook when backend APIs are available.
const billingHistoryRows: BillingHistoryRow[] = [
	{
		period: 'Mar 2026',
		invoiceId: 'INV-2026-03',
		issuedAt: '2026-03-01',
		amountInCents: 3900,
		status: 'paid',
	},
	{
		period: 'Feb 2026',
		invoiceId: 'INV-2026-02',
		issuedAt: '2026-02-01',
		amountInCents: 3900,
		status: 'paid',
	},
	{
		period: 'Jan 2026',
		invoiceId: 'INV-2026-01',
		issuedAt: '2026-01-01',
		amountInCents: 3900,
		status: 'processing',
	},
];

const billingStatusVariantMap: Record<
	BillingStatus,
	'default' | 'secondary' | 'outline' | 'destructive'
> = {
	paid: 'default',
	processing: 'secondary',
	pending: 'outline',
	failed: 'destructive',
};

const formatCurrency = (amountInCents: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amountInCents / 100);
};

export const SettingsBillingPlansTab = () => {
	const { t } = useTranslate();
	const getStatusLabel = (status: BillingStatus) => {
		switch (status) {
			case 'paid':
				return t('settings.tabs.billingPlans.history.statuses.paid');
			case 'processing':
				return t('settings.tabs.billingPlans.history.statuses.processing');
			case 'pending':
				return t('settings.tabs.billingPlans.history.statuses.pending');
			case 'failed':
				return t('settings.tabs.billingPlans.history.statuses.failed');
			default:
				return status;
		}
	};
	const billingHistoryColumns: DataTableColumn<BillingHistoryRow>[] = [
		{
			accessorKey: 'period',
			header: t('settings.tabs.billingPlans.history.period'),
		},
		{
			accessorKey: 'invoiceId',
			header: t('settings.tabs.billingPlans.history.invoice'),
		},
		{
			accessorKey: 'issuedAt',
			header: t('settings.tabs.billingPlans.history.issuedAt'),
		},
		{
			id: 'amount',
			header: t('settings.tabs.billingPlans.history.amount'),
			cell: (row) => formatCurrency(row.amountInCents),
		},
		{
			id: 'status',
			header: t('settings.tabs.billingPlans.history.status'),
			cell: (row) => (
				<Badge variant={billingStatusVariantMap[row.status]}>
					{getStatusLabel(row.status)}
				</Badge>
			),
		},
	];

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.billingPlans.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.billingPlans.description')}
				</p>
			</header>

			<div className='grid gap-4 lg:grid-cols-2'>
				<Card.Root className='overflow-hidden border-primary/20'>
					<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
						<div className='space-y-1'>
							<Card.Title>
								{t('settings.tabs.billingPlans.paymentMethod.title')}
							</Card.Title>
							<Card.Description>
								{t('settings.tabs.billingPlans.paymentMethod.description')}
							</Card.Description>
						</div>
						<Button
							size='sm'
							variant='secondary'
							isIcon
						>
							<PencilIcon className='size-4' />
						</Button>
					</Card.Header>

					<Card.Content className='grid gap-4 pt-6 md:grid-cols-2'>
						<div className='rounded-lg border p-4 md:col-span-2'>
							<p className='text-muted-foreground text-xs uppercase tracking-wide'>
								{t('settings.tabs.billingPlans.paymentMethod.methodLabel')}
							</p>
							<div className='mt-1 flex items-center gap-3'>
								<p className='text-sm font-medium'>
									{selectedPaymentMethod.brand} ••••{' '}
									{selectedPaymentMethod.last4}
								</p>
								<Badge variant='outline'>
									{t('settings.tabs.billingPlans.paymentMethod.defaultBadge')}
								</Badge>
							</div>
						</div>

						<div className='rounded-lg border p-4'>
							<p className='text-muted-foreground text-xs uppercase tracking-wide'>
								{t('settings.tabs.billingPlans.paymentMethod.holderLabel')}
							</p>
							<p className='mt-1 text-sm font-medium'>
								{selectedPaymentMethod.holderName}
							</p>
						</div>

						<div className='rounded-lg border p-4'>
							<p className='text-muted-foreground text-xs uppercase tracking-wide'>
								{t('settings.tabs.billingPlans.paymentMethod.expiresLabel')}
							</p>
							<p className='mt-1 text-sm font-medium'>
								{selectedPaymentMethod.expiresAt}
							</p>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root className='overflow-hidden border-primary/20'>
					<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
						<div className='space-y-1'>
							<Card.Title>
								{t('settings.tabs.billingPlans.selectedPlan.title')}
							</Card.Title>
							<Card.Description>
								{t('settings.tabs.billingPlans.selectedPlan.description')}
							</Card.Description>
						</div>
						<Button
							size='sm'
							variant='secondary'
							isIcon
						>
							<PencilIcon className='size-4' />
						</Button>
					</Card.Header>
					<Card.Content className='grid gap-4 pt-6'>
						<div className='rounded-lg border p-4'>
							<p className='text-muted-foreground text-xs uppercase tracking-wide'>
								{t('settings.tabs.billingPlans.selectedPlan.planLabel')}
							</p>
							<div className='mt-1 flex items-center gap-3'>
								<p className='text-sm font-medium'>{selectedPlan.name}</p>
								<Badge>
									{t('settings.tabs.billingPlans.selectedPlan.activeBadge')}
								</Badge>
							</div>
						</div>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div className='rounded-lg border p-4'>
								<p className='text-muted-foreground text-xs uppercase tracking-wide'>
									{t('settings.tabs.billingPlans.selectedPlan.priceLabel')}
								</p>
								<p className='mt-1 text-sm font-medium'>
									{formatCurrency(selectedPlan.priceInCents)} /{' '}
									{selectedPlan.interval}
								</p>
							</div>
							<div className='rounded-lg border p-4'>
								<p className='text-muted-foreground text-xs uppercase tracking-wide'>
									{t('settings.tabs.billingPlans.selectedPlan.renewalLabel')}
								</p>
								<p className='mt-1 text-sm font-medium'>
									{selectedPlan.renewalDate}
								</p>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<section className='space-y-2'>
				<div className='space-y-1'>
					<h3 className='text-base font-semibold'>
						{t('settings.tabs.billingPlans.history.title')}
					</h3>
					<p className='text-muted-foreground text-sm'>
						{t('settings.tabs.billingPlans.history.description')}
					</p>
				</div>
				<DataTable
					data={billingHistoryRows}
					columns={billingHistoryColumns}
				/>
			</section>
		</div>
	);
};
