import { Drawer } from '@/components/drawer';
import { TextInput } from '@/components/text-input';
import { useAppForm } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useUser } from '@/hooks/use-user/useUser';
import { AccountFormDangerZone } from './AccountFormDangerZone';
import {
	accountFormSchema,
	useAccountFormDefaultValues,
} from './accountFormSchemas';
import { useMutation } from '@tanstack/react-query';
import { updateUserAccountMutationOptions } from '@/api/user/updateUserAccount';
import { useAccountDrawer } from '@/hooks/use-account-drawer/useAccountDrawer';

export const AccountDrawerForm = () => {
	const user = useUser();
	const { t } = useTranslate();
	const setIsOpen = useAccountDrawer((state) => state.setIsOpen);
	const defaultValues = useAccountFormDefaultValues();

	const { mutateAsync: updateUserAccount } = useMutation(
		updateUserAccountMutationOptions(),
	);

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: accountFormSchema,
			onSubmit: async ({ value }) => {
				await updateUserAccount(value);

				setIsOpen(false);
			},
		},
	});

	return (
		<Drawer.Body>
			<form.Root
				form={form}
				schema={accountFormSchema}
			>
				<form.Group>
					<form.AppField
						name='name'
						children={(field) => <field.TextInput label={t('common.name')} />}
					/>
					<TextInput
						label={t('common.email')}
						readOnly
						value={user.email}
						description={t('account.form.emailDescription')}
					/>
				</form.Group>

				<div className='py-4'>
					<AccountFormDangerZone />
				</div>

				<Drawer.Footer className='justify-end'>
					<form.Subscribe
						selector={(state) => ({
							isDefaultValue: state.isDefaultValue,
						})}
						children={({ isDefaultValue }) => (
							<form.SubmitButton disabled={isDefaultValue}>
								{t('account.form.saveChanges')}
							</form.SubmitButton>
						)}
					/>
				</Drawer.Footer>
			</form.Root>
		</Drawer.Body>
	);
};
