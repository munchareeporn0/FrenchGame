export const OAUTH_LOGIN_URL = 'https://oauth.cmu.ac.th/v1/Authorize.aspx';
export const OAUTH_TOKEN_URL = 'https://oauth.cmu.ac.th/v1/GetToken.aspx';
export const OAUTH_CLIENT_ID = 'RkgQJX53W2a00NbyeQcpbHj2uKAYJ61U2PCX30dM';
export const OAUTH_CLIENT_SECRET = 'MaZaV7NvFKDQEAphbqw9whuZbt8njrErMBPaUhhx';
export const OAUTH_REDIRECT_URI = 'https://us-central1-frenchgame-228900.cloudfunctions.net/oauth-login';

export const OAUTH_URI = 'https://us-central1-frenchgame-228900.cloudfunctions.net';
export const OAUTH_SCOPE = 'cmuitaccount.basicinfo'; 
export const SERVER = 'https://www.ljcmu.com';
// export const SERVER = 'http://localhost:5100';

export function getOAuthAuthenUrl() {
  let backUrl = window.location.origin + '%2F%23%2Flogin'
  return `${OAUTH_LOGIN_URL}?response_type=code&client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&scope=${OAUTH_SCOPE}&state=${backUrl}`;
}
export function getOAuthAuthenUrlMobile() {
  let mobileBackUrl = 'mobile'
  return `${OAUTH_LOGIN_URL}?response_type=code&client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&scope=${OAUTH_SCOPE}&state=${mobileBackUrl}`;
}