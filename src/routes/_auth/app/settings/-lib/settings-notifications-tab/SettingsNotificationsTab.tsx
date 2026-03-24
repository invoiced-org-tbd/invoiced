import { useTranslate } from '@/hooks/use-translate/useTranslate';

export const SettingsNotificationsTab = () => {
	const { t } = useTranslate();

	return (
		<div className='rounded-lg px-6'>
			<h2 className='text-lg font-semibold'>
				{t('settings.tabs.notifications.title')}
			</h2>
			<p className='text-muted-foreground mt-2 text-sm'>
				{t('settings.tabs.notifications.description')}
			</p>
		</div>
	);
};
