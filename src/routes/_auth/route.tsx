import { ensureAuthSessionQueryOptions } from '@/api/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(ensureAuthSessionQueryOptions());
	},
});
