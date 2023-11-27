import Lockr from 'lockr'
import jwt_decode from 'jwt-decode'
import { api, URLS } from './Request';

export const authHandler = (() => {
    let idToken = localStorage.getItem('IdToken') || null;
    let decodedToken = idToken && idToken !== 'undefined' ? jwt_decode(idToken) : {}

    function ensureData() {
        idToken = localStorage.getItem('IdToken') || null;
        decodedToken = idToken && idToken !== 'undefined' ? jwt_decode(idToken) : {};
    }

    return {
        isLogged: () => idToken !== null,
        getToken: () => idToken,
        getAccessToken: () => localStorage.getItem('AccessToken'),
        getRefreshToken: () => localStorage.getItem('RefreshToken'),
        getCPForCNPJ: () => {
            ensureData()
            return decodedToken['cognito:username'] // TODO: Verificar nome da chave
        },
        setToken: (token) => {
            idToken = token
            localStorage.setItem('IdToken', idToken)
        },
        setRefreshToken(token) {
          localStorage.setItem('RefreshToken', token)
        },
        setAccessToken(token) {
          localStorage.setItem('AccessToken', token)
        },
        logout: () => {
            idToken = null;
            localStorage.removeItem('IdToken')
            Lockr.set('ClientData', undefined)
        }
    }
})();


export async function updateTokens() {
  const refreshToken = authHandler.getRefreshToken();

  if (!refreshToken) {
    authHandler.logout();
    window.location.reload();
    return;
  }

  const result = await api.post(`${URLS.AUTENTICACAO}/cliente/atualiza-tokens`, {
    json: refreshToken,
  }).json();

  authHandler.setToken(result.IdToken);
  authHandler.setAccessToken(result.AccessToken);
  authHandler.setRefreshToken(result.RefreshToken);
  
  return;
}

export function isLogged() {
  const idToken = authHandler.getToken();
  return idToken && jwt_decode(idToken).exp > Math.floor(+new Date() / 1000);
}