import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import {
	Building2Icon,
	MailIcon,
	MapPinHouseIcon,
	PlusIcon,
} from 'lucide-react';
import { UpsertCompanyDrawer } from './UpsertCompanyDrawer';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SettingsCompanyTab = () => {
	const { t } = useTranslate();
	const { company } = useCompany();
	const navigate = settingsRouteApi.useNavigate();

	const openCreateDrawer = () => {
		navigate({
			search: (prev) => ({
				...prev,
				tab: 'company',
				companyAction: 'create',
			}),
		});
	};

	const openEditDrawer = () => {
		navigate({
			search: (prev) => ({
				...prev,
				tab: 'company',
				companyAction: 'edit',
			}),
		});
	};

	const companyAddress = [
		company?.address?.street1,
		company?.address?.number,
		company?.address?.street2,
	]
		.filter(Boolean)
		.join(', ');

	const cityStateAddress = [company?.address?.city, company?.address?.state]
		.filter(Boolean)
		.join(' - ');

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.company.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.company.description')}
				</p>
			</header>

			{company ? (
				<Card.Root className='overflow-hidden border-primary/20'>
					<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
						<div className='space-y-1'>
							<Card.Title>
								{t('settings.tabs.company.profile.title')}
							</Card.Title>
							<Card.Description>
								{t('settings.tabs.company.profile.description')}
							</Card.Description>
						</div>
						<Button
							size='sm'
							variant='secondary'
							onClick={openEditDrawer}
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
								{companyAddress || t('settings.tabs.company.profile.noAddress')}
							</p>
							<p className='text-muted-foreground mt-1 text-sm'>
								{cityStateAddress ||
									t('settings.tabs.company.profile.noAddress')}
								{company?.address?.postalCode
									? `, ${company.address.postalCode}`
									: ''}
							</p>
						</div>
					</Card.Content>
				</Card.Root>
			) : (
				<Card.Root className='relative overflow-hidden border-primary/20'>
					<div className='pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-background' />
					<Card.Header className='relative space-y-2'>
						<div className='flex gap-2 items-center'>
							<div className='inline-flex size-10 items-center justify-center rounded-lg border bg-background'>
								<Building2Icon className='size-5 text-primary' />
							</div>
							<Card.Title>
								{t('settings.tabs.company.zeroState.title')}
							</Card.Title>
						</div>
						<Card.Description>
							{t('settings.tabs.company.zeroState.description')}
						</Card.Description>
					</Card.Header>
					<Card.Footer className='relative'>
						<Button
							onClick={openCreateDrawer}
							size='sm'
						>
							<PlusIcon className='size-4' />
							{t('settings.tabs.company.zeroState.primaryAction')}
						</Button>
					</Card.Footer>
				</Card.Root>
			)}

			<UpsertCompanyDrawer company={company} />
		</div>
	);
};
