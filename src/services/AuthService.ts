import {
  signIn,
  getCurrentUser,
  signOut,
  fetchAuthSession,
} from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Amplify } from "aws-amplify";
import type { AwsCredentialIdentity } from "@aws-sdk/types";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_AUTHSTACK_USER_POOL_ID ?? "",
      userPoolClientId:
        import.meta.env.VITE_AWS_AUTHSTACK_USER_POOL_CLIENT_ID ?? "",
      identityPoolId: import.meta.env.VITE_AWS_AUTHSTACK_IDENTITY_POOL_ID ?? "",
    },
  },
});

export class AuthService {
  private static instance: AuthService;
  public jwtToken: string | null = null;
  private temporaryCredentials: AwsCredentialIdentity | null = null;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(username: string, password: string) {
    const signInResult = await signIn({
      username,
      password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
    return signInResult.isSignedIn;
  }

  public async logout() {
    await signOut();
    this.jwtToken = null;
    this.temporaryCredentials = null;
  }

  public async getUserInfo() {
    return await getCurrentUser();
  }

  public async getIdToken() {
    const authSession = await fetchAuthSession();
    this.jwtToken = authSession.tokens?.idToken?.toString() ?? null;
    return this.jwtToken;
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    return this.temporaryCredentials;
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${import.meta.env.VITE_AWS_AUTHSTACK_USER_POOL_ID}`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: import.meta.env.VITE_AWS_REGION,
        },
        identityPoolId: import.meta.env.VITE_AWS_AUTHSTACK_IDENTITY_POOL_ID,
        logins: {
          [cognitoIdentityPool]: this.jwtToken!,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
