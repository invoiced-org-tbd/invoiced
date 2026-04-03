import { Card } from '@/components/card/Card';
import { Button } from '@/components/button/Button';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { getRouteApi } from '@tanstack/react-router';
import {
	ArrowRightIcon,
	Building2Icon,
	CalendarClockIcon,
	FileTextIcon,
	PlusIcon,
	UserCircleIcon,
} from 'lucide-react';

const settingsApiRoute = getRouteApi('/_auth/app/settings/');

type ContractsZeroStateProps = {
	onCreateNewContract: () => void;
};

export const ContractsZeroState = ({
	onCreateNewContract,
}: ContractsZeroStateProps) => {
	const { t } = useTranslate();
	const navigate = settingsApiRoute.useNavigate();
	const { company } = useCompany();

	const goToCompanySetup = () => {
		navigate({
			to: '.',
			search: (prev) => ({
				...prev,
				tab: 'company',
				companyAction: 'create',
			}),
		});
	};

	return (
		<div className='mx-auto w-full max-w-3xl space-y-10'>
			<Card.Root className='relative overflow-hidden rounded-2xl border-primary/20 shadow-sm'>
				<div className='pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-background' />

				<Card.Header className='relative space-y-5 p-8 pb-6'>
					<div
						className={cn(
							'inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
							'bg-primary/10 text-primary',
						)}
					>
						{company
							? t('contracts.zeroState.withCompany.badge')
							: t('contracts.zeroState.withoutCompany.badge')}
					</div>

					<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5'>
						<div className='inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background'>
							{company ? (
								<FileTextIcon className='size-5 text-primary' />
							) : (
								<Building2Icon className='size-5 text-primary' />
							)}
						</div>
						<div className='min-w-0 space-y-2'>
							<Card.Title className='text-xl leading-snug sm:text-2xl'>
								{company
									? t('contracts.zeroState.withCompany.title')
									: t('contracts.zeroState.withoutCompany.title')}
							</Card.Title>
							<Card.Description className='text-base leading-relaxed'>
								{company
									? t('contracts.zeroState.withCompany.description')
									: t('contracts.zeroState.withoutCompany.description')}
							</Card.Description>
						</div>
					</div>
				</Card.Header>

				<Card.Footer className='relative flex-col items-stretch gap-0 px-8 pb-8 pt-0 sm:items-start'>
					{company ? (
						<Button
							size='md'
							onClick={onCreateNewContract}
						>
							<PlusIcon />
							{t('contracts.zeroState.withCompany.cta')}
						</Button>
					) : (
						<Button
							size='md'
							onClick={goToCompanySetup}
						>
							<Building2Icon />
							{t('contracts.zeroState.withoutCompany.cta')}
						</Button>
					)}
				</Card.Footer>
			</Card.Root>

			{company ? (
				<section
					aria-label={t('contracts.zeroState.withCompany.ariaConfigure')}
					className='grid gap-4 sm:grid-cols-3'
				>
					<div className='rounded-xl border border-border bg-card/50 p-4'>
						<div className='mb-3 inline-flex size-9 items-center justify-center rounded-lg border bg-background'>
							<UserCircleIcon className='size-4 text-primary' />
						</div>
						<p className='font-medium text-sm'>
							{t('contracts.zeroState.withCompany.roleTitle')}
						</p>
						<p className='mt-1 text-muted-foreground text-xs leading-relaxed'>
							{t('contracts.zeroState.withCompany.roleDescription')}
						</p>
					</div>
					<div className='rounded-xl border border-border bg-card/50 p-4'>
						<div className='mb-3 inline-flex size-9 items-center justify-center rounded-lg border bg-background'>
							<FileTextIcon className='size-4 text-primary' />
						</div>
						<p className='font-medium text-sm'>
							{t('contracts.zeroState.withCompany.clientProjectTitle')}
						</p>
						<p className='mt-1 text-muted-foreground text-xs leading-relaxed'>
							{t('contracts.zeroState.withCompany.clientProjectDescription')}
						</p>
					</div>
					<div className='rounded-xl border border-border bg-card/50 p-4'>
						<div className='mb-3 inline-flex size-9 items-center justify-center rounded-lg border bg-background'>
							<CalendarClockIcon className='size-4 text-primary' />
						</div>
						<p className='font-medium text-sm'>
							{t('contracts.zeroState.withCompany.scheduleSendingTitle')}
						</p>
						<p className='mt-1 text-muted-foreground text-xs leading-relaxed'>
							{t('contracts.zeroState.withCompany.scheduleSendingDescription')}
						</p>
					</div>
				</section>
			) : (
				<section
					aria-label={t('contracts.zeroState.withoutCompany.ariaNextSteps')}
					className='flex flex-col gap-4 sm:flex-row sm:items-stretch'
				>
					<div className='flex flex-1 flex-col rounded-xl border border-primary/30 bg-primary/5 p-4'>
						<p className='font-semibold text-primary text-xs uppercase tracking-wide'>
							{t('contracts.zeroState.withoutCompany.step1Label')}
						</p>
						<p className='mt-2 font-medium text-sm'>
							{t('contracts.zeroState.withoutCompany.step1Title')}
						</p>
						<p className='mt-1 text-muted-foreground text-xs leading-relaxed'>
							{t('contracts.zeroState.withoutCompany.step1Description')}
						</p>
					</div>
					<div
						className='hidden shrink-0 items-center justify-center sm:flex'
						aria-hidden
					>
						<ArrowRightIcon className='size-5 text-muted-foreground' />
					</div>
					<div className='flex flex-1 flex-col rounded-xl border border-dashed border-border bg-muted/20 p-4'>
						<p className='font-medium text-muted-foreground text-xs uppercase tracking-wide'>
							{t('contracts.zeroState.withoutCompany.step2Label')}
						</p>
						<p className='mt-2 font-medium text-sm text-muted-foreground'>
							{t('contracts.zeroState.withoutCompany.step2Title')}
						</p>
						<p className='mt-1 text-muted-foreground text-xs leading-relaxed'>
							{t('contracts.zeroState.withoutCompany.step2Description')}
						</p>
					</div>
				</section>
			)}
		</div>
	);
};
