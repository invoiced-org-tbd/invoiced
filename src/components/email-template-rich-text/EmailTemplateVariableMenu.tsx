import type { EmailTemplateVariableId } from '@/lib/email-template-variables';
import { EMAIL_TEMPLATE_VARIABLE_IDS } from '@/lib/email-template-variables';
import { Button } from '@/components/button/Button';
import { DropdownMenu } from '@/components/dropdown-menu/DropdownMenu';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { TranslationFn } from '@/translations/types';
import { BracesIcon } from 'lucide-react';

const variableMenuLabel = (
	id: EmailTemplateVariableId,
	t: TranslationFn,
): string => {
	switch (id) {
		case 'client.companyName':
			return t(
				'settings.tabs.automations.emailTemplates.variables.clientCompanyName',
			);
		case 'client.responsibleName':
			return t(
				'settings.tabs.automations.emailTemplates.variables.clientResponsibleName',
			);
		case 'client.responsibleEmail':
			return t(
				'settings.tabs.automations.emailTemplates.variables.clientResponsibleEmail',
			);
		case 'company.name':
			return t(
				'settings.tabs.automations.emailTemplates.variables.companyName',
			);
		case 'company.email':
			return t(
				'settings.tabs.automations.emailTemplates.variables.companyEmail',
			);
		case 'invoice.issueDate':
			return t(
				'settings.tabs.automations.emailTemplates.variables.invoiceIssueDate',
			);
		case 'invoice.fileName':
			return t(
				'settings.tabs.automations.emailTemplates.variables.invoiceFileName',
			);
		case 'contract.roleDescription':
			return t(
				'settings.tabs.automations.emailTemplates.variables.contractRoleDescription',
			);
		case 'contract.rate':
			return t(
				'settings.tabs.automations.emailTemplates.variables.contractRate',
			);
		default: {
			const _exhaustive: never = id;
			return _exhaustive;
		}
	}
};

type EmailTemplateVariableMenuProps = {
	onInsert: (variableId: EmailTemplateVariableId) => void;
	disabled?: boolean;
	triggerLabel: string;
};

export const EmailTemplateVariableMenu = ({
	onInsert,
	disabled,
	triggerLabel,
}: EmailTemplateVariableMenuProps) => {
	const { t } = useTranslate();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Button
					type='button'
					size='xxs'
					variant='secondary'
					isGhost
					disabled={disabled}
					className='shrink-0 gap-1'
					aria-label={triggerLabel}
				>
					<BracesIcon className='size-3' />
					<span className='hidden sm:inline'>{triggerLabel}</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align='end'
				className='max-h-72 overflow-y-auto'
			>
				{EMAIL_TEMPLATE_VARIABLE_IDS.map((id) => (
					<DropdownMenu.Item
						key={id}
						onClick={() => {
							onInsert(id);
						}}
					>
						<span className='font-mono text-xs text-muted-foreground'>
							{`{{${id}}}`}
						</span>
						<span className='ml-2'>{variableMenuLabel(id, t)}</span>
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
