import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { getCurrentUser } from "../../service/userService";

export const useCurrentUser = () => {
	return useQuery({
		queryKey: QUERY_KEYS.CURRENT_USER,
		queryFn: getCurrentUser,
		staleTime: 5 * 60 * 1000,
	});
};
