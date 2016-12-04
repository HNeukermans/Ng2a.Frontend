import { ReplaySubject } from 'rxjs';
import { HubCallBack } from './hub/hub.callback';


export class SignalrConfig {
    url?: string;
    username: string;
    hubName: string;
    queryParams?: any;
    hubCallBacks: Array<HubCallBack>;
    logging: boolean;

    constructor() {
       this.hubCallBacks = new Array<HubCallBack>();  
       this.hubName = '';
       this.logging = true;
       this.username = '';
       this.url = null;
       this.queryParams = null;
    }
}

