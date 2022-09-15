import auth from './auth';
import authRequired from 'server/routes/middleware/auth-required';
import example from './example';
import { Route } from 'server/types/routes';

const routes: Route[] = [
  {
    handler: auth.currentUser,
    method: 'get',
    path: '/api/auth/current',
    middleware: [authRequired]
  },
  {
    handler: auth.signIn,
    method: 'post',
    path: '/api/auth/sign-in'
  },
  {
    handler: example.somethingPublic,
    method: 'get',
    path: '/api/something-public'
  },
  {
    handler: example.somethingPrivate,
    method: 'get',
    path: '/api/something-private',
    middleware: [authRequired]
  }
];

export default routes;
