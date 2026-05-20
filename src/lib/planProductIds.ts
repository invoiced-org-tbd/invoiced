import '@tanstack/react-start/server-only';

import { envServer } from './envServer';
import type { Plan } from './planLimits';

/** Map AbacatePay product IDs (from dashboard) to internal plan keys. */
export const getPlanFromProductId = (productId: string): Plan | null => {
	if (productId === envServer.ABACATEPAY_PRODUCT_STARTER) {
		return 'starter';
	}
	if (productId === envServer.ABACATEPAY_PRODUCT_PRO) {
		return 'pro';
	}
	return null;
};

export const getProductIdForPlan = (plan: Plan): string => {
	return plan === 'starter'
		? envServer.ABACATEPAY_PRODUCT_STARTER
		: envServer.ABACATEPAY_PRODUCT_PRO;
};
