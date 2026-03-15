import { authClient } from '@/lib/authClient';
import { useQueryClient } from '@tanstack/react-query';

export const useLogOut = () => {
	const queryClient = useQueryClient();

	const handleLogOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					queryClient.clear();
					window.location.href = '/';
				},
			},
		});
	};

	return { handleLogOut };
};
