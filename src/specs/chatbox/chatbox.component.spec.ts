// /// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />


// import { inject, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
// import { Component } from '@angular/core';
// import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
// import { Security } from '../../app/domain/auth/security';
// import { AUser } from '../scenarios/a.user';
// import { SignalrEngine } from '../../app/domain/signalr/signalr.engine';
// import { HubEventWatcher } from '../../app/domain/signalr/hub/hub.event.watcher';
// import { SignalrConfig } from '../../app/domain/signalr/signalr.configuration';
// import { HubConnection } from '../../app/domain/signalr/hub/connection/hub.connection';
// import { HubConnectionMock } from '../../app/domain/signalr/hub/connection/hub.connection.mock';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
// import { ChatBox } from '../../app/chatbox/chatbox.component';
// import { HubConnectionMoler } from '../../app/domain/signalr/hub/connection/hub.connection.moler';
// import { ChatMessageComponent } from '../../app/chat.message/chat.message.component';
// import { Avatar } from '../../app/avatar/avatar.component';

// describe('Chatbox', () => {

//   let fixture, sut: ChatBox, element, de, hubMoler: HubConnectionMoler, spy;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule, ReactiveFormsModule],
//       providers: [],
//       declarations: [ChatBox, Avatar, ChatMessageComponent]
//     }).compileComponents();
//   }));

//   describe('ngOnInit', () => {

//     beforeEach(() => {

//       hubMoler = new HubConnectionMoler();
//       fixture = TestBed.createComponent(ChatBox);
//       sut = fixture.componentInstance;  // to access properties and methods
//       de = fixture.debugElement;            // test helper
//       //fixture = TestBed.createComponent(ChatBox);
//       Security.user = () => { return new AUser().GerardSans; }
//       SignalrEngine.connect = (w, c) => hubMoler.mole(w, c);

//       hubMoler.connection.whenQuery('QueryUsers').respond(['Hannes']);
//       //spy = spyOn(hubMoler.connection, 'query').and.returnValue(Observable.from([['Hannes']]));
//       sut.ngOnInit();
//     });

//     it('should watch the hub for events', () => {
//       expect(hubMoler.watchers.find((w) => w.method == 'MessageSent')).toBeDefined('MessageSent is expected to be watched');
//       expect(hubMoler.watchers.find((w) => w.method == 'UserConnected')).toBeDefined('UserConnected is expected to be watched');
//     });

//     fit('should show Gerard as logged in user', () => {
//       expect(sut.loggedInUserName).toBe(Security.user().given_name);
//       fixture.detectChanges();
//     });

//     it('should set the queried users', async(() => {
      
//       fixture.whenStable().then(()=> {
//       //fixture.detectChanges();
//         expect(sut.usernames).toEqual(jasmine.arrayContaining(['Hannes']));
//       });
//     }));

//     it('should query the users and bind the result', async(() => {
//       // fixture.detectChanges();  
//       fixture.whenStable().then(() => {
//        // fixture.detectChanges();  
//         expect(spy).toHaveBeenCalledWith('QueryUsers');
//         expect(sut.usernames).toEqual(jasmine.arrayContaining(['Hannes']));
//       });      
//     }));
//   });




//   //if the connection is established,
//   //and the connection returns users, expect the users to be bound

//   //if the connection is established,
//   //and a message is locally created

//   //if the connection is established,
//   //and a local message is send by user X
//   //and a  remote message is received by user Y
//   //

//   //if the connection is established, and the status is changed 

//   //  onConnect
//   //         .combineLatest(onMessageSubmit)
//   //         .merge(scMessageReceived2$)

// });
