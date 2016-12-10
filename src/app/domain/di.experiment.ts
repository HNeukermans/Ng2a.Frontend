import { Injectable } from '@angular/core';

@Injectable()
export class INeedA {

    constructor(public a: A) {

    }

    writeMessage() {
        console.log(this.a.message);
    }
}

@Injectable()
export class A {

    constructor() {

    }
}