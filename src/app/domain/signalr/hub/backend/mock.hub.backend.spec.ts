// import { HubBackendMock } from './mock.hub.backend';
// import { SignalrConfig } from '../../signalr.configuration';
// import { HubCallBack } from '../hub.callback';
// import { HubConnectionMock } from '../connection/hub.connection.mock';
// import { HubConnection } from '../connection/hub.connection';
// import { HubEventWatcher } from '../hub.event.watcher';

// describe('HubBackendMock', () => {

//     let hcb = new HubEventWatcher('OnMessageReceived');
//     let backend = new HubBackendMock();
//     backend.watchers = [hcb];
//     let connection: HubConnection = null;

//     it('should create a mock connection with configuration', () => {
//         //act
//         backend.createConnection().subscribe(c => connection = c);

//         //assert
//         expect(connection).not.toBeNull();
//         expect(connection).toEqual(jasmine.any(HubConnectionMock))
//         expect(connection.watc).toEqual(config);
//     });
// });
