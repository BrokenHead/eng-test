import { User } from 'shared/types/models';
import { SignInBody } from 'shared/types/api';

export interface SessionModule {
  load(): Promise<void>;
  resetSession(): void;
  session: Readonly<Session>;
  signIn(body: SignInBody): Promise<void>;
}

export interface Session {
  currentUser: User | null;
  isLoadingCurrentUser: boolean;
}
