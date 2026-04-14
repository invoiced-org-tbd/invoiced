import { useUser } from '@/hooks/use-user/useUser';
import z from 'zod';

export const accountFormSchema = z.object({
	name: z.string().min(1),
});
type AccountFormSchema = z.infer<typeof accountFormSchema>;

export const useAccountFormDefaultValues = (): AccountFormSchema => {
	const user = useUser();

	return {
		name: user.name,
	};
};
