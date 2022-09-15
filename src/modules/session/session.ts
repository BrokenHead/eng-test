import {
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { Session, SessionModule } from './types';
import { useErrors } from '@/modules/errors';
import { useStore } from '@/modules/store';
import http from '@/services/http';
import { AxiosError } from 'axios';

export function useSession(): SessionModule {
  const { handleErrorQuietly } = useErrors();

  const store = useStore<Session>(
    'Session',
    {
      currentUser: null,
      isLoadingCurrentUser: false
    },
    {
      save: 'local'
    }
  );

  async function load() {
    try {
      if (!store.state.currentUser) {
        return;
      }

      store.update({
        isLoadingCurrentUser: true
      });

      const response = await http.get<CurrentUserResponse>('/api/auth/current');

      store.update({
        currentUser: response.data.user,
        isLoadingCurrentUser: false
      });
    } catch (err) {
      store.reset();
      const error = err as AxiosError;
      handleErrorQuietly(error);
    }
  }

  async function signIn(body: SignInBody) {
    try {
      const response = await http.post<SignInResponse>('/api/auth/sign-in', body);

      store.update({
        currentUser: response.data.user
      });
    } catch (error) {
      throw error;
    }
  }

  return {
    load,
    resetSession: store.reset,
    session: store.state,
    signIn,
  };
}
