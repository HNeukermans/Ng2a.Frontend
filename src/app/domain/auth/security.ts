import { SignalrEngine } from '../signalr/signalr.engine';
import { Authentication } from 'adal-ts';
import { AdalClientConfiguration } from './adal.client.configuration';

export class Security {

    public static user: () => any = Security.getAuthenticatedUser;

    private static getAuthenticatedUser(): any {
        return Authentication.getContext(
            {
                clientId: APP_CONFIG.AD_DIRECTORY_ID,
                tenant: 'hneu70532.onmicrosoft.com',
                redirectUri: window.location + '/',
                postLogoutRedirectUrl: window.location + '/'
            }
        ).getUser();
    }
}