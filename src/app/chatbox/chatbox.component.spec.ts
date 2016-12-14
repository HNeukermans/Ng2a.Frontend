/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />


import { inject, TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ChatBox } from './chatbox.component';
import { Security } from '../domain/auth/security';
import { AUser } from '../scenarios/a.user';
import { SignalrEngine } from '../domain/signalr/signalr.engine';
import { HubEventWatcher } from '../domain/signalr/hub/hub.event.watcher';
import { SignalrConfig } from '../domain/signalr/signalr.configuration';
import { HubConnection } from '../domain/signalr/hub/connection/hub.connection';
import { HubConnectionMock } from '../domain/signalr/hub/connection/hub.connection.mock';
import { HubConnectionMoler } from '../domain/signalr/hub/connection/hub.connection.moler';
import { Avatar } from '../avatar/avatar.component';
import { ChatMessageComponent } from '../chat.message/chat.message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HubBackend } from '../domain/signalr/hub/backend/hub.backend';

describe('Chatbox', () => {

  let fixture: ComponentFixture<ChatBox>, sut: ChatBox, element, de, hubMoler: HubConnectionMoler, spy;
  let hubEventWatchers: Array<HubEventWatcher>, hubConfiguration: SignalrConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [],
      declarations: [ChatBox, Avatar, ChatMessageComponent]
    }).compileComponents();
  }));

  describe(':When ngOnInit', () => {

    beforeEach(() => {
      //hubMoler = new HubConnectionMoler();
      fixture = TestBed.createComponent(ChatBox);
      sut = fixture.componentInstance;  // to access properties and methods
      //fixture = TestBed.createComponent(ChatBox);
      Security.user = () => { return new AUser().GerardSans; }
      //SignalrEngine.connect = (w, c) => hubMoler.mole(w, c);

      spyOn(SignalrEngine, 'connect').and.callFake((w, c) => {
        hubEventWatchers = w;
        hubConfiguration = c;
        return Promise.resolve();
      });

      //hubMoler.connection.whenQuery('QueryUsers').respond(['Hannes']);
      //spy = spyOn(hubMoler.connection, 'query').and.returnValue(Observable.from([['Hannes']]));
      //sut.ngOnInit();
    });

    function act() {
      sut.ngOnInit();
    }

    it('should watch the hub for events', () => {
      act();
      expect(hubEventWatchers).not.toBeNull();
      expect(hubEventWatchers.find((w) => w.method == 'MessageSent')).toBeDefined('MessageSent is expected to be watched');
      expect(hubEventWatchers.find((w) => w.method == 'UserConnected')).toBeDefined('UserConnected is expected to be watched');
    });

    it('should configure the hub', () => {
      act();
      expect(hubConfiguration).not.toBeNull();
    });

    it('should connect to signalr', () => {
      act();
      expect(SignalrEngine.connect).toHaveBeenCalled();
    });

    it('should set the authenticated user', () => {
      act();
      expect(sut.authenticatedUser).toEqual(Security.user());
      //fixture.detectChanges();
    });

    // it('should set the queried users', async(() => {
    //   act();
    //   fixture.whenStable().then(()=> {
    //   //fixture.detectChanges();
    //     expect(sut.usernames).toEqual(jasmine.arrayContaining(['Hannes']));
    //   });
    // }));
    describe(':When signalr connects', () => {

      beforeEach(() => {
        hubMoler = new HubConnectionMoler();
        fixture = TestBed.createComponent(ChatBox);
        sut = fixture.componentInstance;
        Security.user = () => { return new AUser().GerardSans; }
        SignalrEngine.connect = (w, c) => hubMoler.mole(w, c);
        //hubMoler.connection.whenQuery('QueryUsers').respond(['Hannes']);
        //hubMoler.connection.whenQuery('QueryUsers').respond(['Hannes']);
        //spy = spyOn(hubMoler.connection, 'query').and.returnValue(Observable.from([['Hannes']]));
        sut.ngOnInit();
      });

      function act() {
        hubMoler.connection.resolve();
      }

      it('should query the peer users', fakeAsync(() => {
        //spies on connection need to happen after ngOnInit !!!
        spyOn(hubMoler.connection, 'query').and.callThrough();
        act();
        tick();
        //fixture.whenStable().then(()=> {
          expect(hubMoler.connection.query).toHaveBeenCalledWith('QueryUsers');
        //})        
      }));

      it('should bind the peer users', fakeAsync(() => {
        hubMoler.connection.whenQuery('QueryUsers').respond(['Hannes']);
        act();
        tick();
        //fixture.whenStable().then(()=> {
          expect(sut.usernames).toEqual(['Hannes']);
        //});
      }));
      
      // it('should set the queried users', async(() => {
      //   act();
      //   fixture.whenStable().then(()=> {
      //   //fixture.detectChanges();
      //     expect(sut.usernames).toEqual(jasmine.arrayContaining(['Hannes']));
      //   });
      // }));

    })
  });




  //if the connection is established,
  //and the connection returns users, expect the users to be bound

  //if the connection is established,
  //and a message is locally created

  //if the connection is established,
  //and a local message is send by user X
  //and a  remote message is received by user Y
  //

  //if the connection is established, and the status is changed 

  //  onConnect
  //         .combineLatest(onMessageSubmit)
  //         .merge(scMessageReceived2$)

});
