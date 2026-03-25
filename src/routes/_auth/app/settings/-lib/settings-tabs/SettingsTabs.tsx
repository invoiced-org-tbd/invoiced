import { Tabs } from '@/components/tabs/Tabs';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { settingsTabs } from '../consts';
import type { SettingsTab } from '../consts';

type SettingsTabsProps = {
	activeTab: SettingsTab;
	onTabChange: (value: string) => void;
};

export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
	const { t } = useTranslate();

	return (
		<Tabs.Root
			orientation='vertical'
			value={activeTab}
			onValueChange={onTabChange}
			className='grid md:grid-cols-[220px_1fr]'
		>
			<Tabs.List className='h-fit items-stretch p-1'>
				{settingsTabs.map((item) => {
					const Icon = item.icon;
					return (
						<Tabs.Trigger
							key={item.value}
							value={item.value}
						>
							<Icon />
							{t(item.labelKey)}
						</Tabs.Trigger>
					);
				})}
			</Tabs.List>

			{settingsTabs.map((item) => (
				<Tabs.Content
					key={item.value}
					value={item.value}
				>
					<item.Content />
				</Tabs.Content>
			))}
		</Tabs.Root>
	);
};
