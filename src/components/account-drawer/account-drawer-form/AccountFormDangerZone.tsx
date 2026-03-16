import { Button } from '@/components/button';
import { ToggleSection } from '@/components/toggle-section';
import { deleteUserAccountMutationOptions } from '@/api/user/deleteUserAccount';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const AccountFormDangerZone = () => {
	const queryClient = useQueryClient();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const { mutateAsync: deleteAccount, isPending } = useMutation({
		...deleteUserAccountMutationOptions(),
		onSuccess: () => {
			queryClient.clear();
			window.location.href = '/';
		},
	});

	return (
		<ToggleSection.Root variant='destructive'>
			<ToggleSection.Header>
				<ToggleSection.Title>Danger Zone</ToggleSection.Title>
				<ToggleSection.Description>
					Delete account permanently
				</ToggleSection.Description>
			</ToggleSection.Header>

			<ToggleSection.Content>
				<div className='flex flex-col gap-4 pt-1'>
					<div>
						<p className=''>
							Before deleting your account, review what happens next:
						</p>

						<ul className='list-disc space-y-0.5 pl-4'>
							<li>All your profile data and saved preferences are removed.</li>
							<li>Connected sessions are signed out immediately.</li>
							<li>This action cannot be undone after confirmation.</li>
						</ul>
					</div>

					{isConfirmationOpen ? (
						<div className='flex gap-2 items-center'>
							<p className='text-sm font-medium text-nowrap'>Are you sure?</p>

							<Button
								variant='secondary'
								onClick={() => setIsConfirmationOpen(false)}
								disabled={isPending}
								size='xxs'
							>
								Cancel
							</Button>
							<Button
								variant='destructive'
								onClick={() => deleteAccount()}
								isLoading={isPending}
								size='xxs'
							>
								Delete my account
							</Button>
						</div>
					) : (
						<Button
							variant='destructive'
							onClick={() => setIsConfirmationOpen(true)}
						>
							Delete Account
						</Button>
					)}
				</div>
			</ToggleSection.Content>
		</ToggleSection.Root>
	);
};
