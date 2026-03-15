import { getAuthSessionQueryOptions } from '@/api/auth';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useUser = () => {
	const { data: session } = useSuspenseQuery(getAuthSessionQueryOptions());

	if (!session?.user) {
		throw new Error('User not found in useUser hook');
	}

	return session.user;
};
