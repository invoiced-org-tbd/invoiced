import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { Building2Icon, PlusIcon } from 'lucide-react';

type CompanyZeroStateProps = {
	onSetupCompanyClick: () => void;
};
export const CompanyZeroState = ({
	onSetupCompanyClick,
}: CompanyZeroStateProps) => {
	const { t } = useTranslate();

	return (
		<Card.Root className='relative overflow-hidden border-primary/20'>
			<div className='pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-background' />
			<Card.Header className='relative space-y-2'>
				<div className='flex gap-2 items-center'>
					<div className='inline-flex size-10 items-center justify-center rounded-lg border bg-background'>
						<Building2Icon className='size-5 text-primary' />
					</div>
					<Card.Title>{t('settings.tabs.company.zeroState.title')}</Card.Title>
				</div>
				<Card.Description>
					{t('settings.tabs.company.zeroState.description')}
				</Card.Description>
			</Card.Header>
			<Card.Footer className='relative'>
				<Button
					onClick={onSetupCompanyClick}
					size='sm'
				>
					<PlusIcon className='size-4' />
					{t('settings.tabs.company.zeroState.primaryAction')}
				</Button>
			</Card.Footer>
		</Card.Root>
	);
};
