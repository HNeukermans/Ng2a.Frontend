/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />


import { inject, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
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

describe('Chatbox', () => {

  let fixture, sut: ChatBox, element, de, hubMoler: HubConnectionMoler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [],
      declarations: [ChatBox, Avatar, ChatMessageComponent]
    }).compileComponents();
  }));

  

  describe('ngOnInit', () => {

    beforeEach(() => {

      hubMoler = new HubConnectionMoler();
      fixture = TestBed.createComponent(ChatBox);
      sut = fixture.componentInstance;  // to access properties and methods
      de = fixture.debugElement;            // test helper
//fixture = TestBed.createComponent(ChatBox);
      Security.user = () => { return new AUser().GerardSans; }
      SignalrEngine.connect = (w,c) => hubMoler.mole(w,c);

      hubMoler.connection.whenQuery('QueryUsers').respond('Hannes');
      spyOn(hubMoler.connection, 'query').and.callThrough();
      sut.ngOnInit();
    });

    it('should watch the hub for events', () => {
      expect(hubMoler.watchers.find((w) => w.method == 'MessageSent')).toBeDefined('MessageSent is expected to be watched');
      expect(hubMoler.watchers.find((w) => w.method == 'UserConnected')).toBeDefined('UserConnected is expected to be watched');
    });

    it('should show Gerard as logged in user', () => {
      expect(sut.loggedInUserName).toBe(Security.user().given_name);
    });

    it('should query the users', () => {
      expect(hubMoler.connection.query).toHaveBeenCalledWith('QueryUsers');
    });
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
