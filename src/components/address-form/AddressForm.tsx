import { TextInput } from '@/components/text-input/TextInput';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useCountryItems, useGetCountryName } from '@/lib/countries';
import type { AddressFormProps, AddressFormValues } from './types';

export const AddressForm = withFieldGroup({
	defaultValues: {} as AddressFormValues,
	props: {} as AddressFormProps,
	render: ({ group, labels, fixedCountryCode }) => {
		const { countryItems } = useCountryItems();
		const { getCountryName } = useGetCountryName();

		return (
			<group.Group>
				<group.Separator>{labels.sectionTitle}</group.Separator>
				<group.AppField
					name='street1'
					children={(field) => (
						<field.TextInput
							label={labels.street1Label}
							placeholder={labels.street1Placeholder}
						/>
					)}
				/>
				<group.AppField
					name='street2'
					children={(field) => (
						<field.TextInput
							label={labels.street2Label}
							placeholder={labels.street2Placeholder}
						/>
					)}
				/>

				<div className='flex gap-4'>
					<group.AppField
						name='number'
						children={(field) => (
							<field.TextInput
								label={labels.numberLabel}
								placeholder={labels.numberPlaceholder}
							/>
						)}
					/>
					<group.AppField
						name='postalCode'
						children={(field) => (
							<field.TextInput
								label={labels.postalCodeLabel}
								placeholder={labels.postalCodePlaceholder}
							/>
						)}
					/>
				</div>
				<div className='flex gap-4'>
					<group.AppField
						name='city'
						children={(field) => (
							<field.TextInput
								label={labels.cityLabel}
								placeholder={labels.cityPlaceholder}
							/>
						)}
					/>
					<group.AppField
						name='state'
						children={(field) => (
							<field.TextInput
								label={labels.stateLabel}
								placeholder={labels.statePlaceholder}
							/>
						)}
					/>
					{fixedCountryCode ? (
						<TextInput
							label={labels.countryLabel}
							placeholder={labels.countryPlaceholder}
							value={getCountryName(fixedCountryCode)}
							disabled
						/>
					) : (
						<group.AppField
							name='country'
							children={(field) => (
								<field.SelectInput
									label={labels.countryLabel}
									placeholder={labels.countryPlaceholder}
									items={countryItems}
								/>
							)}
						/>
					)}
				</div>
			</group.Group>
		);
	},
});
