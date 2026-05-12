import { getInvoiceFileName } from '@/api/invoice-configuration/utils/getInvoiceFileName';
import { Tabs } from '@/components/tabs/Tabs';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { useStore } from '@tanstack/react-store';
import type { InvoiceConfigurationFormSchema } from './invoiceConfigurationFormSchemas';

type InvoiceConfigurationFormFieldsProps = {
	previewCompanyName: string;
	previewReferenceDate: Date;
};

export const InvoiceConfigurationFormFields = withFieldGroup({
	defaultValues: {} as InvoiceConfigurationFormSchema,
	props: {} as InvoiceConfigurationFormFieldsProps,
	render: ({ group, previewCompanyName, previewReferenceDate }) => {
		const { t } = useTranslate();
		const values = useStore(group.store, (state) => state.values);

		const { invoiceFileName } = getInvoiceFileName({
			invoiceConfiguration: values,
			companyName: previewCompanyName,
			date: previewReferenceDate,
		});

		const handleNumberingModeChange = (v: string) => {
			const mode = v as 'new' | 'existing';
			group.setFieldValue('invoiceNumberingMode', mode);
			if (mode === 'new') {
				group.setFieldValue('lastInvoiceNumber', 0);
			} else {
				group.setFieldValue('lastInvoiceNumber', (prev) =>
					prev < 1 ? 1 : prev,
				);
			}
		};

		return (
			<group.Group className='gap-6'>
				<group.SubSet>
					<h3 className='text-sm font-medium'>
						{t('contracts.invoiceConfigurationSetup.patternSectionTitle')}
					</h3>
					<div className={cn('grid grid-cols-1 gap-4', 'sm:grid-cols-2')}>
						<group.AppField
							name='prefix'
							children={(field) => (
								<field.TextInput
									label={t('contracts.invoiceConfigurationSetup.prefixLabel')}
								/>
							)}
						/>
						<group.AppField
							name='suffix'
							children={(field) => (
								<field.TextInput
									label={t('contracts.invoiceConfigurationSetup.suffixLabel')}
								/>
							)}
						/>
					</div>

					<div className='gap-3 flex flex-col'>
						<p className='text-sm font-medium'>
							{t('contracts.invoiceConfigurationSetup.includeSectionTitle')}
						</p>
						<div
							className={cn(
								'grid grid-cols-1 gap-2',
								'sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2',
							)}
						>
							<group.AppField
								name='withYear'
								children={(field) => (
									<field.Checkbox
										label={t(
											'contracts.invoiceConfigurationSetup.withYearLabel',
										)}
									/>
								)}
							/>
							<group.AppField
								name='withMonth'
								children={(field) => (
									<field.Checkbox
										label={t(
											'contracts.invoiceConfigurationSetup.withMonthLabel',
										)}
									/>
								)}
							/>
							<group.AppField
								name='withDay'
								children={(field) => (
									<field.Checkbox
										label={t(
											'contracts.invoiceConfigurationSetup.withDayLabel',
										)}
									/>
								)}
							/>
							<group.AppField
								name='withCompanyName'
								children={(field) => (
									<field.Checkbox
										label={t(
											'contracts.invoiceConfigurationSetup.withCompanyNameLabel',
										)}
									/>
								)}
							/>
						</div>
					</div>
				</group.SubSet>

				<div
					className={cn(
						'rounded-lg border border-border bg-muted/50 p-4',
						'gap-1.5 flex flex-col',
					)}
				>
					<p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
						{t('contracts.invoiceConfigurationSetup.previewCaption')}
					</p>
					<p className='break-all font-mono text-sm'>{invoiceFileName}</p>
				</div>

				<group.SubSet>
					<h3 className='text-sm font-medium'>
						{t('contracts.invoiceConfigurationSetup.numberingSectionTitle')}
					</h3>
					<Tabs.Root
						value={values.invoiceNumberingMode}
						onValueChange={handleNumberingModeChange}
						className='gap-3'
					>
						<Tabs.List className='w-full'>
							<Tabs.Trigger value='new'>
								{t('contracts.invoiceConfigurationSetup.numberingTabNewLabel')}
							</Tabs.Trigger>
							<Tabs.Trigger value='existing'>
								{t(
									'contracts.invoiceConfigurationSetup.numberingTabExistingLabel',
								)}
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value='new'>
							<p className='text-muted-foreground pt-1 text-sm leading-relaxed'>
								{t('contracts.invoiceConfigurationSetup.numberingNewTabHint')}
							</p>
						</Tabs.Content>
						<Tabs.Content
							value='existing'
							className='gap-3 flex flex-col pt-1'
						>
							<group.AppField
								name='lastInvoiceNumber'
								children={(field) => (
									<field.NumberInput
										label={t(
											'contracts.invoiceConfigurationSetup.lastInvoiceNumberLabel',
										)}
										description={t(
											'contracts.invoiceConfigurationSetup.numberingExistingTabHint',
										)}
									/>
								)}
							/>
						</Tabs.Content>
					</Tabs.Root>
				</group.SubSet>
			</group.Group>
		);
	},
});
