/// <reference path="../../../node_modules/@types/adal/index.d.ts" />
import { Observer, Observable, AsyncSubject } from 'rxjs';

export interface AuthContext extends adal.AuthenticationContext {
    isLoggedIn(): boolean;
    processAdRedirect(): void;
    //observe(observer: ILogObserver): void;
    //observe(observer: Observer<string, string>): void;
}

export interface ILogObserver extends Observer<string> {

}

export class LogAsyncAsyncSubject extends AsyncSubject<string> {

}