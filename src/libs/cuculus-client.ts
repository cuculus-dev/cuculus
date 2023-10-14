import {
  AuthApi,
  Configuration,
  DefaultApi,
  InvitationsApi,
  UsersApi,
} from '@cuculus/cuculus-api';
import { AuthMiddleware } from '@/libs/auth-middleware';

const authMiddleware = new AuthMiddleware();

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_CUCULUS_API_URL,
  accessToken: authMiddleware.fetchAccessToken,
});

const authApi = new AuthApi(config);
const usersApi = new UsersApi(config);
const defaultApi = new DefaultApi(config);
const invitationsApi = new InvitationsApi(config);

export { authMiddleware, authApi, usersApi, defaultApi, invitationsApi };
