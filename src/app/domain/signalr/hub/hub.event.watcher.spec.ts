import { HubEventWatcher } from './hub.event.watcher';

describe('HubEventWatcher', () => {

    it('constructor should set method', () => {
        let w = new HubEventWatcher('OnMessageReceive');
        expect(w.method).toEqual('OnMessageReceive');
    });

    it('constructor should throw when message is empty', () => {
        let action = () => new HubEventWatcher('');
        expect(action).toThrow();
    });

    it('constructor should throw when message is null', () => {
        let action = () => new HubEventWatcher(null);
        expect(action).toThrow();
    });
});
