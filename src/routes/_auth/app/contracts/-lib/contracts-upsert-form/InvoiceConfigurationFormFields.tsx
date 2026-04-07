import { getInvoiceFileName } from '@/api/invoice-configuration/utils/getInvoiceFileName';
import { Tabs } from '@/components/tabs/Tabs';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { useStore } from '@tanstack/react-form';

type InvoiceConfigurationFormFieldsProps = {
	// AppFieldExtendedReactFormApi from useAppForm is verbose to type; callers pass the same form instance from useAppForm.
	// biome-ignore lint/suspicious/noExplicitAny: see above
	form: any;
	previewCompanyName: string;
	previewReferenceDate: Date;
};

export const InvoiceConfigurationFormFields = ({
	form,
	previewCompanyName,
	previewReferenceDate,
}: InvoiceConfigurationFormFieldsProps) => {
	const { t } = useTranslate();
	const values = useStore(form.store, (state) => state.values);

	const { invoiceFileName } = getInvoiceFileName({
		invoiceConfiguration: values,
		companyName: previewCompanyName,
		date: previewReferenceDate,
	});

	const handleNumberingModeChange = (v: string) => {
		const mode = v as 'new' | 'existing';
		form.setFieldValue('invoiceNumberingMode', mode);
		if (mode === 'new') {
			form.setFieldValue('lastInvoiceNumber', 0);
		} else {
			form.setFieldValue('lastInvoiceNumber', (prev) => (prev < 1 ? 1 : prev));
		}
	};

	return (
		<form.Group className='gap-6'>
			<form.SubSet>
				<h3 className='text-sm font-medium'>
					{t('contracts.invoiceConfigurationSetup.patternSectionTitle')}
				</h3>
				<div className={cn('grid grid-cols-1 gap-4', 'sm:grid-cols-2')}>
					<form.AppField
						name='prefix'
						children={(field) => (
							<field.TextInput
								label={t('contracts.invoiceConfigurationSetup.prefixLabel')}
							/>
						)}
					/>
					<form.AppField
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
						<form.AppField
							name='withYear'
							children={(field) => (
								<field.Checkbox
									label={t('contracts.invoiceConfigurationSetup.withYearLabel')}
								/>
							)}
						/>
						<form.AppField
							name='withMonth'
							children={(field) => (
								<field.Checkbox
									label={t(
										'contracts.invoiceConfigurationSetup.withMonthLabel',
									)}
								/>
							)}
						/>
						<form.AppField
							name='withDay'
							children={(field) => (
								<field.Checkbox
									label={t('contracts.invoiceConfigurationSetup.withDayLabel')}
								/>
							)}
						/>
						<form.AppField
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
			</form.SubSet>

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

			<form.SubSet>
				<h3 className='text-sm font-medium'>
					{t('contracts.invoiceConfigurationSetup.numberingSectionTitle')}
				</h3>
				<Tabs.Root
					value={values.invoiceNumberingMode}
					onValueChange={handleNumberingModeChange}
					className='gap-3'
				>
					<Tabs.List className='w-full'>
						<Tabs.Trigger
							value='new'
							className='min-w-0 flex-1'
						>
							{t('contracts.invoiceConfigurationSetup.numberingTabNewLabel')}
						</Tabs.Trigger>
						<Tabs.Trigger
							value='existing'
							className='min-w-0 flex-1'
						>
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
						<form.AppField
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
			</form.SubSet>
		</form.Group>
	);
};
