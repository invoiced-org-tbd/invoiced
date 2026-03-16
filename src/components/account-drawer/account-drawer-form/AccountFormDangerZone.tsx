import { Button } from '@/components/button';
import { ToggleSection } from '@/components/toggle-section';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';

const loginRouteApi = getRouteApi('/');
export const AccountFormDangerZone = () => {
	const navigate = loginRouteApi.useNavigate();
	const { t } = useTranslate();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const { mutateAsync: deleteAccount, isPending } = useMutation({
		mutationFn: async () => {
			toast.error(t('account.dangerZone.notImplemented'));
		},
		onSuccess: () => {
			navigate({ to: '/' });
		},
	});

	return (
		<ToggleSection.Root variant='destructive'>
			<ToggleSection.Header>
				<ToggleSection.Title>{t('account.dangerZone.title')}</ToggleSection.Title>
				<ToggleSection.Description>
					{t('account.dangerZone.description')}
				</ToggleSection.Description>
			</ToggleSection.Header>

			<ToggleSection.Content>
				<div className='flex flex-col gap-4 pt-1'>
					<div>
						<p className=''>
							{t('account.dangerZone.intro')}
						</p>

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
								size='xxs'
							>
								{t('common.cancel')}
							</Button>
							<Button
								variant='destructive'
								onClick={() => deleteAccount()}
								isLoading={isPending}
								size='xxs'
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
