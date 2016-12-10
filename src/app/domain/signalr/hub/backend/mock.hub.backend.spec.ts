import { MockHubBackend } from './mock.hub.backend';
import { SignalrConfig } from '../../signalr.configuration';
import { HubCallBack } from '../hub.callback';
import { MockHubConnection } from '../connection/mock.hub.connection';
import { HubConnection } from '../connection/hub.connection';

describe('MockHubBackend', () => {

    let config = new SignalrConfig();
    let hcb = new HubCallBack('OnMessageReceived');
    config.hubCallBacks.push(hcb);
    let backend = new MockHubBackend();
    backend.configuration = config;
    let connection: HubConnection = null;

    it('should create a mock connection with configuration', () => {
        //act
        backend.createConnection().subscribe(c => connection = c);

        //assert
        expect(connection).not.toBeNull();
        expect(connection).toEqual(jasmine.any(MockHubConnection))
        expect(connection.configuration).toEqual(config);
    });
});
