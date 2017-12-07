import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

export const setToken = token => {
  if (process.SERVER_BUILD) return;
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)));
  Cookie.set('jwt', token);
};

export const unsetToken = () => {
  if (process.SERVER_BUILD) return;
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('secret');
  Cookie.remove('jwt');
  window.localStorage.setItem('logout', Date.now());
};

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return;
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='));
  if (!jwtCookie) return;
  const jwt = jwtCookie.split('=')[1];
  return {
    user: jwtDecode(jwt),
    token: jwt
  };
};

export const getUserFromLocalStorage = () => {
  const user = window.localStorage.user;
  const token = window.localStorage.token;
  return user && token ? { user: JSON.parse(user), token } : undefined;
};

export const setSecret = secret =>
  window.localStorage.setItem('secret', secret);

export const checkSecret = secret => window.localStorage.secret === secret;
