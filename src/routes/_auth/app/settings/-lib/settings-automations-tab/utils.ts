import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { SmtpSecurity } from './smtpUpsertFormSchemas';

type GetSmtpSecurityLabelProps = {
	security: 'none' | 'ssl_tls' | 'starttls';
};
export const useGetSmtpSecurityLabel = () => {
	const { t } = useTranslate();

	const getSmtpSecurityLabel = ({ security }: GetSmtpSecurityLabelProps) => {
		switch (security) {
			case 'starttls':
				return t('settings.tabs.automations.smtp.securityModes.starttls');
			case 'ssl_tls':
				return t('settings.tabs.automations.smtp.securityModes.sslTls');
			default:
				return t('settings.tabs.automations.smtp.securityModes.none');
		}
	};

	return { getSmtpSecurityLabel };
};

export type SmtpProviderPreset = 'gmail' | 'outlook' | 'mailgun' | 'sendgrid';

type SmtpProviderPresetItem = {
	label: string;
	value: SmtpProviderPreset;
	host: string;
	port: number;
	security: SmtpSecurity;
};
export const useSmtpProviderPresetItems = () => {
	const { t } = useTranslate();

	const providerPresetItems = [
		{
			label: t('settings.tabs.automations.smtp.presets.providers.gmail'),
			value: 'gmail',
			host: 'smtp.gmail.com',
			port: 587,
			security: 'starttls',
		},
		{
			label: t('settings.tabs.automations.smtp.presets.providers.outlook'),
			value: 'outlook',
			host: 'smtp.office365.com',
			port: 587,
			security: 'starttls',
		},
		{
			label: t('settings.tabs.automations.smtp.presets.providers.mailgun'),
			value: 'mailgun',
			host: 'smtp.mailgun.org',
			port: 587,
			security: 'starttls',
		},
		{
			label: t('settings.tabs.automations.smtp.presets.providers.sendgrid'),
			value: 'sendgrid',
			host: 'smtp.sendgrid.net',
			port: 587,
			security: 'starttls',
		},
	] as const satisfies SmtpProviderPresetItem[];

	return { providerPresetItems };
};

export const useSmtpSecurityItems = () => {
	const { t } = useTranslate();

	const securityItems = [
		{
			label: t('settings.tabs.automations.smtp.securityModes.starttls'),
			value: 'starttls',
		},
		{
			label: t('settings.tabs.automations.smtp.securityModes.sslTls'),
			value: 'ssl_tls',
		},
		{
			label: t('settings.tabs.automations.smtp.securityModes.none'),
			value: 'none',
		},
	];

	return { securityItems };
};
