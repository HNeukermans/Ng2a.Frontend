import { HubCallBack } from './hub.callback';

describe('HubCallBack', () => {

    it('constructor should set method', () => {
        let hc = new HubCallBack('OnMessageReceive');
        expect(hc.method).toEqual('OnMessageReceive');
    });
});
