import { createCheckoutMutationOptions } from '@/api/subscription/createCheckout';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { Plan } from '@/lib/planLimits';
import { PLAN_PRICING, PLANS } from '@/lib/planLimits';
import { cn } from '@/utils/classNamesUtils';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth/app/plan/')({
	component: PlanSelectionPage,
});

const PlanFeatureList = ({ plan }: { plan: Plan }) => {
	const { t } = useTranslate();
	const features =
		plan === 'starter'
			? [
					t('planSelection.features.starter.contract'),
					t('planSelection.features.starter.manualSend'),
					t('planSelection.features.starter.miniErp'),
				]
			: [
					t('planSelection.features.pro.unlimitedContracts'),
					t('planSelection.features.pro.autoSend'),
					t('planSelection.features.pro.miniErp'),
				];

	return (
		<>
			{features.map((label) => (
				<div
					key={label}
					className='flex items-center gap-2 text-sm'
				>
					<CheckCircle2 className='size-4 shrink-0 text-primary-muted' />
					<span>{label}</span>
				</div>
			))}
		</>
	);
};

function PlanSelectionPage() {
	const { t } = useTranslate();
	const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
	const checkoutMutation = useMutation(createCheckoutMutationOptions());

	const handleSelectPlan = async (plan: Plan) => {
		setSelectedPlan(plan);
		try {
			const result = await checkoutMutation.mutateAsync({ plan });
			const url =
				'data' in result &&
				result.data &&
				typeof result.data === 'object' &&
				'url' in result.data
					? String((result.data as { url: string }).url)
					: null;
			if (url) {
				window.location.href = url;
			}
		} catch {
			toast.error(t('planSelection.checkoutError'));
			setSelectedPlan(null);
		}
	};

	return (
		<div className='flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12'>
			<div className='mx-auto w-full max-w-3xl space-y-8'>
				<header className='space-y-2 text-center'>
					<h1 className='text-2xl font-bold tracking-tight'>
						{t('planSelection.title')}
					</h1>
					<p className='text-muted-foreground text-sm'>
						{t('planSelection.description')}
					</p>
					<Badge variant='secondary'>{t('planSelection.trialBadge')}</Badge>
				</header>

				<div className='grid gap-6 md:grid-cols-2'>
					{PLANS.map((plan) => {
						const pricing = PLAN_PRICING[plan];
						const isPro = plan === 'pro';
						const isLoading =
							checkoutMutation.isPending && selectedPlan === plan;

						return (
							<Card.Root
								key={plan}
								className={cn(
									'relative flex flex-col',
									isPro && 'border-primary',
								)}
							>
								{isPro && (
									<span className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'>
										{t('planSelection.recommended')}
									</span>
								)}
								<Card.Header>
									<p className='text-sm font-semibold text-muted-foreground'>
										{pricing.label}
									</p>
									<Card.Title className='flex items-end gap-1'>
										<span className='text-3xl font-extrabold'>
											{new Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(pricing.priceInCents / 100)}
										</span>
										<span className='text-sm font-medium text-muted-foreground'>
											{t('planSelection.perMonth')}
										</span>
									</Card.Title>
								</Card.Header>
								<Card.Content className='flex-1 space-y-3'>
									<PlanFeatureList plan={plan} />
								</Card.Content>
								<Card.Footer>
									<Button
										className='w-full'
										variant={isPro ? 'primary' : 'secondary'}
										onClick={() => handleSelectPlan(plan)}
										isLoading={isLoading}
									>
										{t(
											plan === 'pro'
												? 'planSelection.ctaPro'
												: 'planSelection.ctaStarter',
										)}
									</Button>
								</Card.Footer>
							</Card.Root>
						);
					})}
				</div>
			</div>
		</div>
	);
}
