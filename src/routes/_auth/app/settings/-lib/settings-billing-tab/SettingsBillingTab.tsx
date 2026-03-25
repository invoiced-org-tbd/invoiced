import { useTranslate } from '@/hooks/use-translate/useTranslate';

export const SettingsBillingTab = () => {
	const { t } = useTranslate();

	return (
		<div className='rounded-lg px-6'>
			<h2 className='text-lg font-semibold'>
				{t('settings.tabs.billing.title')}
			</h2>
			<p className='text-muted-foreground mt-2 text-sm'>
				{t('settings.tabs.billing.description')}
			</p>
		</div>
	);
};
