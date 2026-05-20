import { changeAbacateSubscriptionPlan } from '@/lib/abacatepayApi';
import type { Plan } from '@/lib/planLimits';
import { PLANS } from '@/lib/planLimits';
import { getProductIdForPlan } from '@/lib/planProductIds';
import { getT } from '@/utils/languageUtils';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { subscriptionQueryKeys } from './subscriptionApiUtils';
import {
	getUserSubscription,
	upsertSubscriptionForUser,
} from './subscriptionUtils';

const changePlanParams = z.object({
	plan: z.enum(PLANS),
});

type ChangePlanParams = z.infer<typeof changePlanParams>;

const changePlanServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(changePlanParams)
	.handler(async ({ data: { plan }, context: { user } }) => {
		try {
			const t = getT();
			const subscription = await getUserSubscription(user.id);

			if (!subscription?.abacateSubscriptionId) {
				throw new ServerError({
					message: t('subscription.server.noActiveSubscription'),
				});
			}

			if (subscription.plan === plan) {
				throw new ServerError({
					message: t('subscription.server.alreadyOnPlan'),
				});
			}

			const productId = getProductIdForPlan(plan);

			await changeAbacateSubscriptionPlan({
				subscriptionId: subscription.abacateSubscriptionId,
				productId,
			});

			await upsertSubscriptionForUser({
				userId: user.id,
				plan,
				status: subscription.status,
				abacateSubscriptionId: subscription.abacateSubscriptionId,
				abacateCustomerId: subscription.abacateCustomerId,
				trialEndsAt: subscription.trialEndsAt,
				currentPeriodEnd: subscription.currentPeriodEnd,
			});

			return createSuccessResponse({
				data: null,
				message: t('subscription.server.planChangeScheduled'),
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const changePlanMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: ChangePlanParams) =>
			changePlanServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [subscriptionQueryKeys.base()],
			});
		},
	});
