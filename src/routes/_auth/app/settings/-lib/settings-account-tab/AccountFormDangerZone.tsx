import { Button } from '@/components/button/Button';
import { ToggleSection } from '@/components/toggle-section/ToggleSection';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { deleteUserAccountMutationOptions } from '@/api/user/deleteUserAccount';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export const AccountFormDangerZone = () => {
	const navigate = useNavigate();
	const { t } = useTranslate();
	const queryClient = useQueryClient();

	const [isDangerZoneOpen, setIsDangerZoneOpen] = useState(false);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const { mutateAsync: deleteAccount, isPending } = useMutation({
		...deleteUserAccountMutationOptions(),
		onSuccess: () => {
			queryClient.clear();
			navigate({ to: '/' });
		},
	});

	return (
		<ToggleSection.Root
			variant='destructive'
			open={isDangerZoneOpen}
			onOpenChange={setIsDangerZoneOpen}
		>
			<ToggleSection.Header>
				<ToggleSection.Title>
					{t('account.dangerZone.title')}
				</ToggleSection.Title>
				<ToggleSection.Description>
					{t('account.dangerZone.description')}
				</ToggleSection.Description>
			</ToggleSection.Header>

			<ToggleSection.Content>
				<div className='flex flex-col gap-4 pt-1'>
					<div>
						<p className=''>{t('account.dangerZone.intro')}</p>

						<ul className='list-disc space-y-0.5 pl-4'>
							<li>{t('account.dangerZone.itemDataRemoved')}</li>
							<li>{t('account.dangerZone.itemSessionsSignedOut')}</li>
							<li>{t('account.dangerZone.itemCannotUndo')}</li>
						</ul>
					</div>

					{isConfirmationOpen ? (
						<div className='flex gap-2 items-center'>
							<p className='text-sm font-medium text-nowrap'>
								{t('account.dangerZone.areYouSure')}
							</p>

							<Button
								variant='secondary'
								onClick={() => setIsConfirmationOpen(false)}
								disabled={isPending}
							>
								{t('common.cancel')}
							</Button>
							<Button
								variant='destructive'
								onClick={() => deleteAccount()}
								isLoading={isPending}
							>
								{t('account.dangerZone.deleteMyAccount')}
							</Button>
						</div>
					) : (
						<Button
							variant='destructive'
							onClick={() => setIsConfirmationOpen(true)}
						>
							{t('account.dangerZone.deleteAccount')}
						</Button>
					)}
				</div>
			</ToggleSection.Content>
		</ToggleSection.Root>
	);
};
