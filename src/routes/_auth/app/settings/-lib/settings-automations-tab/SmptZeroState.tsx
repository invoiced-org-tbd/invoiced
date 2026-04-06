import { useTranslate } from '@/hooks/use-translate/useTranslate';

export const SmptZeroState = () => {
	const { t } = useTranslate();

	return (
		<div className='rounded-lg border border-dashed p-6 space-y-1'>
			<p className='text-sm font-medium'>
				{t('settings.tabs.automations.smtp.emptyState.title')}
			</p>
			<p className='text-muted-foreground text-sm'>
				{t('settings.tabs.automations.smtp.emptyState.description')}
			</p>
		</div>
	);
};
