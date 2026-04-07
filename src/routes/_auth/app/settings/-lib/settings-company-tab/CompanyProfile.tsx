import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useFormatAddressSingleLine } from '@/utils/addressUtils';
import { MailIcon, MapPinHouseIcon } from 'lucide-react';

type CompanyProfileProps = {
	onEditCompanyClick: () => void;
};
export const CompanyProfile = ({ onEditCompanyClick }: CompanyProfileProps) => {
	const { t } = useTranslate();
	const { company } = useCompany();
	const { formatAddress } = useFormatAddressSingleLine();

	if (!company) {
		return null;
	}

	const companyAddress = formatAddress({ address: company.address });

	return (
		<Card.Root className='overflow-hidden border-primary/20'>
			<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
				<div className='space-y-1'>
					<Card.Title>{t('settings.tabs.company.profile.title')}</Card.Title>
					<Card.Description>
						{t('settings.tabs.company.profile.description')}
					</Card.Description>
				</div>
				<Button
					size='sm'
					variant='secondary'
					onClick={onEditCompanyClick}
				>
					{t('common.edit')}
				</Button>
			</Card.Header>

			<Card.Content className='grid gap-4 pt-6 md:grid-cols-2'>
				<div className='rounded-lg border p-4'>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('createCompany.form.nameLabel')}
					</p>
					<p className='mt-1 text-sm font-medium'>{company.name}</p>
				</div>

				<div className='rounded-lg border p-4'>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('common.email')}
					</p>
					<p className='mt-1 text-sm font-medium flex items-center gap-2'>
						<MailIcon className='size-4 text-muted-foreground' />
						{company.email}
					</p>
				</div>

				<div className='rounded-lg border p-4 md:col-span-2'>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('createCompany.form.addressSectionTitle')}
					</p>
					<p className='mt-1 text-sm font-medium flex items-center gap-2'>
						<MapPinHouseIcon className='size-4 text-muted-foreground' />
						{companyAddress}
					</p>
				</div>
			</Card.Content>
		</Card.Root>
	);
};
