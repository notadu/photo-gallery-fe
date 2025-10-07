import { useQuery } from "react-query";
import { AuthService } from "../services/AuthService";

const authService = AuthService.getInstance();

export const useAuth = () => {
  const { data: token, isLoading: isSessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: () => authService.getIdToken(),
  });

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getUserInfo,
    enabled: !!token,
  });

  return {
    token,
    user,
    isLoading: isSessionLoading || (token && isUserLoading),
    isAuthenticated: !!user,
  };
};
