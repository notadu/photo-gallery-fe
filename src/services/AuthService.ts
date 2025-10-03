import { signIn, getCurrentUser, signOut } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AUTHSTACK_USER_POOL_ID ?? "",
      userPoolClientId:
        import.meta.env.VITE_AUTHSTACK_USER_POOL_CLIENT_ID ?? "",
      identityPoolId: import.meta.env.VITE_AUTHSTACK_IDENTITY_POOL_ID ?? "",
    },
  },
});

export class AuthService {
  // private user: SignInOutput | undefined;
  // private userName: string | undefined;

  public async login(
    username: string,
    password: string,
  ): Promise<{ name: string; id: string } | null> {
    const signInResult = await signIn({
      username,
      password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
    if (signInResult.isSignedIn) {
      const userInfo = await this.getUserInfo();
      // this.user = signInResult;
      // this.userName = userInfo?.name;
      return userInfo;
    } else {
      throw new Error("Something went wrong during login");
    }
  }

  public async logout(): Promise<void> {
    // Simulate an API call to log out the user
    return await signOut();
  }

  public async getUserInfo(): Promise<{
    name: string;
    id: string;
  } | null> {
    try {
      const { username, userId } = await getCurrentUser();
      return { name: username, id: userId };
    } catch (error) {
      console.error("Get user info error:", error);
      return null;
    }
  }
}
