import { cancelSubscriptionMutationOptions } from '@/api/subscription/cancelSubscription';
import { changePlanMutationOptions } from '@/api/subscription/changePlan';
import { getSubscriptionQueryOptions } from '@/api/subscription/getSubscription';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { Plan, SubscriptionStatus } from '@/lib/planLimits';
import { isSubscriptionActive, PLAN_PRICING, PLANS } from '@/lib/planLimits';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const formatCurrency = (amountInCents: number) =>
	new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(amountInCents / 100);

const formatDate = (date: Date | null | undefined) => {
	if (!date) {
		return '—';
	}
	return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date);
};

const statusVariantMap: Record<
	SubscriptionStatus,
	'default' | 'secondary' | 'outline' | 'destructive'
> = {
	active: 'default',
	trialing: 'secondary',
	past_due: 'destructive',
	cancelled: 'outline',
};

export const SettingsBillingPlansTab = () => {
	const { t } = useTranslate();
	const { data: subscription } = useSuspenseQuery(
		getSubscriptionQueryOptions(),
	);
	const cancelMutation = useMutation(cancelSubscriptionMutationOptions());
	const changePlanMutation = useMutation(changePlanMutationOptions());

	if (!subscription) {
		return (
			<div className='rounded-lg px-6 space-y-4'>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.billingPlans.noSubscription')}
				</p>
			</div>
		);
	}

	const plan = subscription.plan as Plan;
	const status = subscription.status as SubscriptionStatus;
	const pricing = PLAN_PRICING[plan];
	const otherPlan = PLANS.find((p) => p !== plan) as Plan;
	const canManage = isSubscriptionActive(status);

	const getStatusLabel = (s: SubscriptionStatus) => {
		switch (s) {
			case 'active':
				return t('settings.tabs.billingPlans.statuses.active');
			case 'trialing':
				return t('settings.tabs.billingPlans.statuses.trialing');
			case 'cancelled':
				return t('settings.tabs.billingPlans.statuses.cancelled');
			case 'past_due':
				return t('settings.tabs.billingPlans.statuses.pastDue');
			default:
				return s;
		}
	};

	const handleCancel = async () => {
		try {
			await cancelMutation.mutateAsync();
			toast.success(t('settings.tabs.billingPlans.cancelSuccess'));
		} catch {
			toast.error(t('settings.tabs.billingPlans.cancelError'));
		}
	};

	const handleChangePlan = async () => {
		try {
			await changePlanMutation.mutateAsync({ plan: otherPlan });
			toast.success(t('settings.tabs.billingPlans.changePlanSuccess'));
		} catch {
			toast.error(t('settings.tabs.billingPlans.changePlanError'));
		}
	};

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.billingPlans.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.billingPlans.description')}
				</p>
			</header>

			<Card.Root className='overflow-hidden border-primary/20'>
				<Card.Header className='border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
					<Card.Title>
						{t('settings.tabs.billingPlans.selectedPlan.title')}
					</Card.Title>
					<Card.Description>
						{t('settings.tabs.billingPlans.selectedPlan.description')}
					</Card.Description>
				</Card.Header>
				<Card.Content className='grid gap-4 pt-6 sm:grid-cols-2'>
					<div className='rounded-lg border p-4 sm:col-span-2'>
						<p className='text-muted-foreground text-xs uppercase tracking-wide'>
							{t('settings.tabs.billingPlans.selectedPlan.planLabel')}
						</p>
						<div className='mt-1 flex items-center gap-3'>
							<p className='text-sm font-medium'>{pricing.label}</p>
							<Badge variant={statusVariantMap[status]}>
								{getStatusLabel(status)}
							</Badge>
						</div>
					</div>

					<div className='rounded-lg border p-4'>
						<p className='text-muted-foreground text-xs uppercase tracking-wide'>
							{t('settings.tabs.billingPlans.selectedPlan.priceLabel')}
						</p>
						<p className='mt-1 text-sm font-medium'>
							{formatCurrency(pricing.priceInCents)} /{' '}
							{t('settings.tabs.billingPlans.selectedPlan.month')}
						</p>
					</div>

					<div className='rounded-lg border p-4'>
						<p className='text-muted-foreground text-xs uppercase tracking-wide'>
							{status === 'trialing'
								? t('settings.tabs.billingPlans.selectedPlan.trialEndsLabel')
								: t('settings.tabs.billingPlans.selectedPlan.renewalLabel')}
						</p>
						<p className='mt-1 text-sm font-medium'>
							{formatDate(
								status === 'trialing'
									? subscription.trialEndsAt
									: subscription.currentPeriodEnd,
							)}
						</p>
					</div>
				</Card.Content>
				{canManage && (
					<Card.Footer className='flex flex-wrap gap-2 border-t pt-4'>
						<Button
							variant='secondary'
							size='sm'
							onClick={handleChangePlan}
							isLoading={changePlanMutation.isPending}
						>
							{t('settings.tabs.billingPlans.changePlan', {
								plan: PLAN_PRICING[otherPlan].label,
							})}
						</Button>
						<Button
							variant='secondary'
							isOutlined
							size='sm'
							onClick={handleCancel}
							isLoading={cancelMutation.isPending}
						>
							{t('settings.tabs.billingPlans.cancelSubscription')}
						</Button>
					</Card.Footer>
				)}
			</Card.Root>
		</div>
	);
};
