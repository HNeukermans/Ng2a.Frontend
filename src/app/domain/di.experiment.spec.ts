import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Title } from '../home/title/title.service';
import { A, INeedA } from './di.experiment';

describe('Title', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            A,
            // { provide: A, useClass: A },
            {
                provide: INeedA,
                useFactory: (a) => new INeedA(a),
                deps: [A]
            }
        ]
    }));

    it('should have http', inject([INeedA], (iNeedA: INeedA) => {
        expect(iNeedA.writeMessage()).toEqual(true);
    }));


});
