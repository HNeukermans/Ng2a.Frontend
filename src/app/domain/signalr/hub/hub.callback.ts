import { ReplaySubject } from 'rxjs';

export class HubCallBack extends ReplaySubject<any[]> {
    constructor(public method: string) {
        super();
    }
}