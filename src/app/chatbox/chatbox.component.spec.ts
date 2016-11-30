/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import {  inject,  TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {  BaseRequestOptions,  ConnectionBackend,  Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('Title', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]}));

  
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
