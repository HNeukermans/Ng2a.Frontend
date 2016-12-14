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
import { SignalrMessage } from '../domain/signalr/signalr.message';

describe('Chatbox:Messages', () => {

  let fixture, sut: ChatBox, element, de, hubMoler: HubConnectionMoler, spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [],
      declarations: [ChatBox, Avatar, ChatMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    hubMoler = new HubConnectionMoler();
    fixture = TestBed.createComponent(ChatBox);
    sut = fixture.componentInstance;  // to access properties and methods
    Security.user = () => { return new AUser().GerardSans; }
    SignalrEngine.connect = (w, c) => hubMoler.mole(w, c);
    hubMoler.connection.whenQuery('QueryUsers').respond(['Hannes']);
    spyOn(hubMoler.connection, 'command').and.returnValue(Observable.from(['OK']));
  });

  describe('click add should sent message', () => {

    it('should watch the hub for events', fakeAsync(() => {

      function act() {
        sut.txtMessage = 'Hi there';
        sut.btnAddClick$.next('void');
        sut.btnAddClick$.next('void');
        sut.txtMessageEnter$.next('void');
        hubMoler.connection.mockStatus('START');
      };

      sut.ngOnInit();
      tick();
      sut.txtMessage = 'Hi there';
       tick();
       sut.txtMessageEnter$.next('void');
      //tick();
      act();
      tick();
      //fixture.whenStable().then(() => {

      //assert
      const expectedMessage = new SignalrMessage(Security.user().given_name, 'Hi there');
      expect(hubMoler.connection.command).toHaveBeenCalledWith(['message', expectedMessage]);
      // });

    }));
  });

});
