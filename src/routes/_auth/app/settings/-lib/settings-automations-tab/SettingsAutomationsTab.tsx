import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { SmtpConfigList } from './SmtpConfigList';
import { EmailTemplateList } from './EmailTemplateList';

export const SettingsAutomationsTab = () => {
	const { t } = useTranslate();

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.automations.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.automations.description')}
				</p>
			</header>

			<div className='grid gap-4 lg:grid-cols-2'>
				<SmtpConfigList />

				<EmailTemplateList />
			</div>
		</div>
	);
};
