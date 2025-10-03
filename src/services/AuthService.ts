import {
  signIn,
  getCurrentUser,
  signOut,
  fetchAuthSession,
} from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
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
  private jwtToken: string | undefined;
  private temporaryCredentials: object | undefined;

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
      await this.getIdToken();
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

  public async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    return this.temporaryCredentials;
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${import.meta.env.VITE_AUTHSTACK_USER_POOL_ID}`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: import.meta.env.VITE_AWS_REGION,
        },
        identityPoolId: import.meta.env.VITE_AUTHSTACK_IDENTITY_POOL_ID,
        logins: {
          [cognitoIdentityPool]: this.jwtToken!,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
