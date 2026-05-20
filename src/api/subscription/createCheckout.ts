import type { Plan } from '@/lib/planLimits';
import { PLANS } from '@/lib/planLimits';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { createAbacateSubscriptionCheckout } from './utils/createAbacateSubscriptionCheckout';

const createCheckoutParams = z.object({
	plan: z.enum(PLANS),
});

type CreateCheckoutParams = z.infer<typeof createCheckoutParams>;

const createCheckoutServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createCheckoutParams)
	.handler(async ({ data: { plan }, context: { user } }) => {
		try {
			const { url } = await createAbacateSubscriptionCheckout({
				userId: user.id,
				plan,
			});

			return createSuccessResponse({
				data: { url },
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export type CreateCheckoutResponse = ExtractServerFnData<
	typeof createCheckoutServerFn
>;

export const createCheckoutMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: CreateCheckoutParams) =>
			createCheckoutServerFn({ data: params }),
	});
