import { updateUserAccountMutationOptions } from '@/api/user/updateUserAccount';
import { AccountFormDangerZone } from '@/components/account-drawer/account-drawer-form/AccountFormDangerZone';
import {
	accountFormSchema,
	useAccountFormDefaultValues,
} from '@/components/account-drawer/account-drawer-form/accountFormSchemas';
import { Button } from '@/components/button/Button';
import { TextInput } from '@/components/text-input/TextInput';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useUser } from '@/hooks/use-user/useUser';
import { cn } from '@/utils/classNamesUtils';
import { useMutation } from '@tanstack/react-query';

export const SettingsAccountTab = () => {
	const user = useUser();
	const { t } = useTranslate();
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
			},
		},
	});

	return (
		<form.Root
			form={form}
			schema={accountFormSchema}
		>
			<div className='rounded-lg px-6 space-y-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-lg font-semibold'>
							{t('settings.tabs.account.title')}
						</h2>
						<p className='text-muted-foreground mt-2 text-sm'>
							{t('settings.tabs.account.description')}
						</p>
					</div>

					<form.Subscribe
						selector={(state) => ({
							isDefaultValue: state.isDefaultValue,
						})}
						children={({ isDefaultValue }) => (
							<div
								className={cn(
									'flex items-center gap-2',
									isDefaultValue && 'hidden',
									'animate-in fade-in duration-100 ease-linear',
								)}
							>
								<Button
									isOutlined
									variant='secondary'
									size='sm'
									onClick={() => form.reset()}
								>
									{t('common.cancel')}
								</Button>
								<form.SubmitButton
									disabled={isDefaultValue}
									size='sm'
								>
									{t('account.form.saveChanges')}
								</form.SubmitButton>
							</div>
						)}
					/>
				</div>

				<form.Group className='grid grid-cols-4 gap-2'>
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

				<AccountFormDangerZone />
			</div>
		</form.Root>
	);
};
