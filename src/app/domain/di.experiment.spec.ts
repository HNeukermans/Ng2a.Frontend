// import { inject, TestBed } from '@angular/core/testing';
// import { Component, ChangeDetectorRef } from '@angular/core';
// import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
// import { Title } from '../home/title/title.service';
// import { A, INeedA } from './di.experiment';
// import { RealHubConnectionBackend } from './signalr/hub/connection.backend/real.hub.connection.backend';
// import { SignalrEngine } from './signalr/signalr.engine';
// import { SignalrConfig } from './signalr/signalr.configuration';
// import { HubConnectionMockBackend } from './signalr/hub/connection.backend/hub.connection.mock.backend';
// import { ChatBox } from '../chatbox/chatbox.component';
// import { HubConnectionMock } from './signalr/hub/connection/hub.connection.mock';
// import { AuthProvider } from './auth.provider';
// import { HubCallBack } from './signalr/hub/hub.callback';

// describe('Title', () => {
//     beforeEach(() => TestBed.configureTestingModule({
//         providers: [
//             ChatBox,
//             AuthProvider,
//             ChangeDetectorRef,
//             HubConnectionMockBackend,
//             {
//                 provide: SignalrEngine,
//                 useFactory: (backend) => new SignalrEngine(backend),
//                 deps: [HubConnectionMockBackend]
//             }
//         ]
//     }));

//     it('should have http', inject([INeedA], (iNeedA: INeedA) => {
//         expect(iNeedA.writeMessage()).toEqual(true);
//     }));

//     it('constructor should set method', inject([HubConnectionMockBackend], (backend: HubConnectionMockBackend) => {
//         let hc = new HubCallBack('OnMessageReceive');
//         expect(hc.method).toEqual('OnMessageReceive');
//     }));


//     it('should have http', inject([HubConnectionMockBackend], (backend: HubConnectionMockBackend) => {
//         let config = new SignalrConfig();
//         let hc = new HubCallBack('OnMessageReceive');
//         config.hubCallBacks.push(hc);
        
//         expect(config.hubCallBacks).toEqual(true);
//     }));

//     it('should SignalR', inject([ChatBox, HubConnectionMockBackend], (chatBox: ChatBox, mockBackend: HubConnectionMockBackend) => {
//         debugger;
//         chatBox.ngOnInit();
//         chatBox.txtMessage = 'Hannes';
//         chatBox.btnAddClick$.next(null);
//         mockBackend.configuration.hubCallBacks[0].next([{ prop: 'test', payload: {} }]);

//     }));


// });
