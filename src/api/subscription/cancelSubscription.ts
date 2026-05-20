import { cancelAbacateSubscription } from '@/lib/abacatepayApi';
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
import { sessionMiddleware } from '../sessionMiddleware';
import { subscriptionQueryKeys } from './subscriptionApiUtils';
import {
	getUserSubscription,
	upsertSubscriptionForUser,
} from './subscriptionUtils';

const cancelSubscriptionServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const t = getT();
			const subscription = await getUserSubscription(user.id);

			if (!subscription?.abacateSubscriptionId) {
				throw new ServerError({
					message: t('subscription.server.noActiveSubscription'),
				});
			}

			await cancelAbacateSubscription(subscription.abacateSubscriptionId);

			await upsertSubscriptionForUser({
				userId: user.id,
				plan: subscription.plan,
				status: 'cancelled',
				abacateSubscriptionId: subscription.abacateSubscriptionId,
				abacateCustomerId: subscription.abacateCustomerId,
			});

			return createSuccessResponse({
				data: null,
				message: t('subscription.server.cancelled'),
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const cancelSubscriptionMutationOptions = () =>
	createMutationOptions({
		mutationFn: () => cancelSubscriptionServerFn(),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [subscriptionQueryKeys.base()],
			});
		},
	});
