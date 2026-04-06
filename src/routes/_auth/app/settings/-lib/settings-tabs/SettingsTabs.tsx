import { Tabs } from '@/components/tabs/Tabs';
import type { SettingsTab } from '../..';
import { settingsTabsSchema } from '../..';
import { useSettingsTabs } from './consts';

const assertIsSettingsTab = (value: string): value is SettingsTab => {
	return settingsTabsSchema.options.some((option) => option === value);
};

type SettingsTabsProps = {
	activeTab: SettingsTab;
	onTabChange: (value: SettingsTab) => void;
};
export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
	const { settingsTabs } = useSettingsTabs();

	const handleTabChange = (value: string) => {
		if (!assertIsSettingsTab(value)) {
			return;
		}

		onTabChange(value);
	};

	return (
		<Tabs.Root
			orientation='vertical'
			value={activeTab}
			onValueChange={handleTabChange}
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
							{item.label}
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
