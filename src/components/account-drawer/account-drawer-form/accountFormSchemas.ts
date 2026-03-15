import { useUser } from '@/hooks/use-user';
import z from 'zod';

export const accountFormSchema = z.object({
	name: z.string().min(1),
});
export type AccountFormSchema = z.infer<typeof accountFormSchema>;

export const useAccountFormDefaultValues = (): AccountFormSchema => {
	const user = useUser();

	return {
		name: user.name,
	};
};
