import { Injectable } from '@angular/core';
import { AuthProvider } from './auth.provider';
import { ReplaySubject } from 'rxjs';
import { AppConfig } from '../environment';
@Injectable()
export class DefaultSignalrConfig {

    constructor(
        private authProvider: AuthProvider) {
        console.log('DefaultSignalrConfig ctr');
    }


    public get(): SignalrConfig {
        let config: SignalrConfig = {
            hubName: 'ChatAppHub',
            url: AppConfig.signalUrl,
            username: this.getloggedInUserName(),
            serverCallBacks: [],
            logging: true
        };
        return config;
    }

    private getloggedInUserName() {
        let user = this.authProvider.getContext().getCachedUser();
        if (!user) throw new Error('Failed to get logged in user name. User must be authenticated!');
        return user.profile.given_name;
    }
}

export interface SignalrConfig {
    url?: string;
    username: string;
    hubName: string;
    queryParams?: any;
    serverCallBacks: ServerCallBack[];
    logging: boolean;
}

export class ServerCallBack extends ReplaySubject<any[]> {
    constructor(public method: string) {
        super();
    }
}