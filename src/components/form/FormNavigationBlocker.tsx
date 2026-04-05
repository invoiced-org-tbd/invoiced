import { useBlocker } from '@tanstack/react-router';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import { useFormContext } from '@/hooks/use-app-form/contexts';
import { isDangerousNavigation, useFormRootContext } from './utils';
import { useTranslate } from '@/hooks/use-translate/useTranslate';

export const FormNavigationBlocker = () => {
	const form = useFormContext();
	const formRootContext = useFormRootContext();
	const { t } = useTranslate();

	const { status, reset, proceed } = useBlocker({
		withResolver: true,
		shouldBlockFn: ({ current, next }) => {
			const isDefaultValue = form.state.isDefaultValue;
			if (isDefaultValue) {
				return false;
			}

			const safeSearchParamKeys = formRootContext?.safeSearchParamKeys ?? [];

			return isDangerousNavigation({
				current,
				next,
				safeSearchParamKeys,
			});
		},
	});
	const isBlocked = status === 'blocked';

	const handleCancel = () => {
		if (!isBlocked) {
			return;
		}

		reset();
	};

	const handleConfirm = () => {
		if (!isBlocked) {
			return;
		}

		proceed();
	};

	return (
		<Dialog.Root
			open={isBlocked}
			onOpenChange={handleCancel}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>{t('form.unsavedChanges.title')}</Dialog.Title>
					<Dialog.Description>
						{t('form.unsavedChanges.description')}
					</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Button
						variant='destructive'
						isGhost={true}
						onClick={handleConfirm}
					>
						{t('form.unsavedChanges.discardAndLeave')}
					</Button>
					<Button
						variant='secondary'
						onClick={handleCancel}
					>
						{t('form.unsavedChanges.stay')}
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
