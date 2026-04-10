import { getInvoiceConfigurationQueryOptions } from '@/api/invoice-configuration/getInvoiceConfiguration';
import { updateInvoiceConfigurationMutationOptions } from '@/api/invoice-configuration/updateInvoiceConfiguration';
import { Dialog } from '@/components/dialog/Dialog';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { InvoiceConfigurationForm } from '@/components/invoice-configuration-form/InvoiceConfigurationForm';
import type { InvoiceConfigurationPersistSchema } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';
import { mapInvoiceConfigurationRowToFormValues } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const InvoiceConfigurationEditDialog = () => {
	const { t } = useTranslate();
	const { isEditingInvoiceConfiguration } = settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();
	const { company } = useCompany();

	const { data: invoiceConfiguration, isLoading } = useQuery({
		...getInvoiceConfigurationQueryOptions(),
		enabled: !!isEditingInvoiceConfiguration,
	});

	const { mutateAsync: updateInvoiceConfiguration } = useMutation(
		updateInvoiceConfigurationMutationOptions(),
	);

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isEditingInvoiceConfiguration: undefined,
			}),
		});
	};

	const previewCompanyName =
		company?.name ?? t('settings.tabs.invoice.previewCompanyPlaceholder');

	const handleSuccess = async (data: InvoiceConfigurationPersistSchema) => {
		await updateInvoiceConfiguration({ form: data });
		handleClose();
	};

	const open = !!isEditingInvoiceConfiguration;

	return (
		<Dialog.Root
			open={open}
			onOpenChange={handleClose}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						{t('settings.tabs.invoice.editDialog.title')}
					</Dialog.Title>
					<Dialog.Description>
						{t('settings.tabs.invoice.editDialog.description')}
					</Dialog.Description>
				</Dialog.Header>

				{isLoading ? (
					<Dialog.Body>
						<p className='text-muted-foreground text-sm'>
							{t('common.loading')}
						</p>
					</Dialog.Body>
				) : invoiceConfiguration ? (
					<InvoiceConfigurationForm
						key={invoiceConfiguration.id}
						defaultValues={mapInvoiceConfigurationRowToFormValues(
							invoiceConfiguration,
						)}
						previewCompanyName={previewCompanyName}
						previewReferenceDate={new Date()}
						onSuccess={handleSuccess}
						submitLabel={t('settings.tabs.invoice.saveChanges')}
					/>
				) : (
					<Dialog.Body>
						<p className='text-muted-foreground text-sm'>
							{t('settings.tabs.invoice.zeroState.description')}
						</p>
					</Dialog.Body>
				)}
			</Dialog.Content>
		</Dialog.Root>
	);
};
