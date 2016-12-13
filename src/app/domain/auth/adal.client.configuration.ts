import { AdalConfig } from 'adal-ts';

export const AdalClientConfiguration:AdalConfig = {
      clientId : APP_CONFIG.AD_DIRECTORY_ID,
      tenant: 'hneu70532.onmicrosoft.com',
      redirectUri : window.location + '/',
      postLogoutRedirectUrl : window.location +'/'
    }



 //new AdalConfig('APP_CONFIG.AD_DIRECTORY_ID', 'hneu70532.onmicrosoft.com',  '/', '/'); 

