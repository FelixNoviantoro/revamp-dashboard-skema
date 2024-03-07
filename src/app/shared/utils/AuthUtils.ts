import { User } from '../../core/models/user.model';

const USER_KEY = 'token';

export const getUserFromLocalStorage = (): User | null => {
  const user = window.localStorage.getItem(USER_KEY);
  if (!user) return null
  return JSON.parse(user)
};

export const setUserToLocalStoage = (token: User) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(token));
};
