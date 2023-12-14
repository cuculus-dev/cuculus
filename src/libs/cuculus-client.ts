import {
  AccountsApi,
  AuthApi,
  Configuration,
  DefaultApi,
  InvitationsApi,
  PostsApi,
  TimelinesApi,
  UsersApi,
} from '@cuculus/cuculus-api';

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_CUCULUS_API_URL,
});

const authApi = new AuthApi(config);
const usersApi = new UsersApi(config);
const defaultApi = new DefaultApi(config);
const invitationsApi = new InvitationsApi(config);
const timelinesApi = new TimelinesApi(config);
const postsApi = new PostsApi(config);
const accountsApi = new AccountsApi(config);

export {
  authApi,
  usersApi,
  defaultApi,
  invitationsApi,
  timelinesApi,
  postsApi,
  accountsApi,
};
