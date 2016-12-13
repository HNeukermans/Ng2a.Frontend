import { ReplaySubject } from 'rxjs';
import { SignalrMessage } from '../signalr.message';

export class HubEventWatcher extends ReplaySubject<SignalrMessage[]> {
    constructor(public method: string) {
        super();
        if (method == null || method === '') throw new Error('Failed to create HubEventWatcher. Argument "method" can not be empty');
    }
}