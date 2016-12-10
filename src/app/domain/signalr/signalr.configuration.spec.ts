import { SignalrConfig } from './signalr.configuration';

describe('SignalrConfig', () => {

    it('constructor should set defaults', () => {
        let config = new SignalrConfig();
        expect(config.hubCallBacks).not.toBeNull('hubcallback should be array');
        expect(config.hubCallBacks.length).toBe(0);
        expect(config.logging).toBe(false, 'logging should be false');
    });
});


