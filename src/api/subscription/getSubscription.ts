import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import { createServerFn } from '@tanstack/react-start';
import { sessionMiddleware } from '../sessionMiddleware';
import { subscriptionQueryKeys } from './subscriptionApiUtils';
import { getUserSubscription } from './subscriptionUtils';

const getSubscriptionServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const subscription = await getUserSubscription(user.id);

			return createSuccessResponse({
				data: subscription ?? null,
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export type GetSubscriptionResponse = ExtractServerFnData<
	typeof getSubscriptionServerFn
>;

export const getSubscriptionQueryOptions = () =>
	createQueryOptions({
		queryKey: subscriptionQueryKeys.get(),
		queryFn: () => getSubscriptionServerFn(),
	});
