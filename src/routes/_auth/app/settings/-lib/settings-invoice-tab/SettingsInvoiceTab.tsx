import { getInvoiceConfigurationQueryOptions } from '@/api/invoice-configuration/getInvoiceConfiguration';
import { Button } from '@/components/button/Button';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi, Link } from '@tanstack/react-router';
import { InvoiceConfigurationEditDialog } from './InvoiceConfigurationEditDialog';
import { InvoiceConfigurationProfile } from './InvoiceConfigurationProfile';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SettingsInvoiceTab = () => {
	const { t } = useTranslate();
	const navigate = settingsRouteApi.useNavigate();

	const { data: invoiceConfiguration, isLoading } = useQuery(
		getInvoiceConfigurationQueryOptions(),
	);

	const handleEditInvoiceConfigurationClick = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isEditing: true,
			}),
		});
	};

	if (isLoading) {
		return (
			<div className='rounded-lg px-6'>
				<p className='text-muted-foreground text-sm'>{t('common.loading')}</p>
			</div>
		);
	}

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.invoice.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.invoice.description')}
				</p>
			</header>

			{invoiceConfiguration ? (
				<InvoiceConfigurationProfile
					invoiceConfiguration={invoiceConfiguration}
					onEditClick={handleEditInvoiceConfigurationClick}
				/>
			) : (
				<div className='border-border bg-muted/40 rounded-lg border p-6 space-y-3'>
					<h3 className='font-medium'>
						{t('settings.tabs.invoice.zeroState.title')}
					</h3>
					<p className='text-muted-foreground text-sm'>
						{t('settings.tabs.invoice.zeroState.description')}
					</p>
					<Button
						asChild
						size='sm'
					>
						<Link to='/app/contracts'>
							{t('settings.tabs.invoice.zeroState.primaryAction')}
						</Link>
					</Button>
				</div>
			)}

			<InvoiceConfigurationEditDialog />
		</div>
	);
};
