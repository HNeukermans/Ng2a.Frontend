import { MockHubBackend } from './mock.hub.backend';
import { SignalrConfig } from '../../signalr.configuration';
import { HubCallBack } from '../hub.callback';
import { MockHubConnection } from '../connection/mock.hub.connection';
import { HubConnection } from '../connection/hub.connection';
import { ValueService } from '../../../value.service';

describe('MockHubConnection', () => {


    let config = new SignalrConfig();
    let hcb = new HubCallBack('OnMessageReceived');

    config.hubCallBacks.push(hcb);

    it('constructor should set the configuration', () => {
        //act
        let connection = new MockHubConnection(config);
        //assert
        expect(connection.configuration).toEqual(config);
    });

    it('mocking a hubcallback should fire the configured hubcallback', () => {
        let receivedMessage = null;
        hcb.subscribe(c => receivedMessage = c);
        //act
        let connection = new MockHubConnection(config);
        //assert
        connection.mockHubCallBack('OnMessageReceived', {});

        expect(receivedMessage).toEqual({});
    });
});
