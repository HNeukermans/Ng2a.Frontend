import { Component, ChangeDetectorRef, ElementRef, OnDestroy, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { AuthProvider, SignalRConnection, SignalrConfig, EstablishedConnection, logToConsole, SignalrMessage } from '../domain';
import { DefaultSignalrConfig, ServerCallBack, handleError } from '../domain';
import { Observable, AsyncSubject, BehaviorSubject, Subscription, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'chatbox',  // <home></home>
    styleUrls: ['./chatbox.component.css'],
    templateUrl: './chatbox.component.html'
})
export class ChatBox implements OnDestroy, OnInit {
    messages: string[] = [];
    usernames: string[] = [];
    loggedInUserName: string = '';
    txtMessageEnter$: ReplaySubject<any>;
    btnAddClick$: ReplaySubject<any>;
    txtMessage: string = '';
    messages$: Observable<SignalrMessage>;
    messageCtrl = new FormControl();

    constructor(
        private _authProvider: AuthProvider,
        private signalrConfig: DefaultSignalrConfig,
        private changeDetector: ChangeDetectorRef) {

        this.txtMessageEnter$ = new ReplaySubject<any>();
        this.btnAddClick$ = new ReplaySubject<any>();
    }

    private subscriptions: Array<Subscription> = [];

    ngOnInit() {
        console.log('hello from Chatbox');


        this.btnAddClick$.do(logToConsole('onBtnAddClick'));
        this.txtMessageEnter$.do(logToConsole('onTxtMessageEnter'));

        let onMessageSubmit = this.txtMessageEnter$
            .merge(this.btnAddClick$)
            .filter(() => this.txtMessage !== '')
            .map(() => new SignalrMessage(this.loggedInUserName, this.txtMessage))
            .do(logToConsole('onMessageSubmit'));

        let scMessageReceived$ = new ServerCallBack('onMessageReceived');
        let s1 = scMessageReceived$
            .do(logToConsole('onMessageReceived'))
            .map((args) => <SignalrMessage>args[0])
            .subscribe((sm) => this.bindNewMessage.bind(this)(sm), handleError);

        let scUserSessionReceived$ = new ServerCallBack('onUserSessionReceived');
        let s2 = scUserSessionReceived$
            .do(logToConsole('onNewUserSessionReceived'))
            .map((args) => <string>args[0])
            .subscribe((u) => this.bindNewUser.bind(this)(u), handleError);

        let signalrConfig = this.signalrConfig.get();

        signalrConfig.serverCallBacks.push(scMessageReceived$);
        signalrConfig.serverCallBacks.push(scUserSessionReceived$);

        let onConnect = new SignalRConnection(signalrConfig).connect();
        onConnect.do(logToConsole('onConnect'));
        let s3 = onConnect.map((conn) => conn.error).subscribe(e => console.log('ChatBox-Connection error occured: ' + JSON.stringify(e)));
        let s4 = onConnect.map((conn) => conn.status).subscribe(s => console.log('ChatBox-Connection status changed: ' + JSON.stringify(s)));

        let s5 = onConnect.flatMap((c) => c.getOtherUsers()).subscribe((usernames) => this.bindUsers.bind(this)(usernames));
        //.subscribe(, handleError);

        let s6 = onConnect.combineLatest(onMessageSubmit)
            .do(logToConsole('SubmittedDuringConnect'))
            .subscribe((args) => (<EstablishedConnection>args[0]).sendMessage(<SignalrMessage>args[1]), handleError);

        let s7 = onMessageSubmit
            .subscribe((m) => this.bindNewMessageAndReset.bind(this)(m), handleError);

        this.loggedInUserName = this._authProvider.getContext().getCachedUser().profile.given_name;

        this.subscriptions = [s1, s2, s3, s4, s5, s6, s7];
    }

    private bindNewMessageAndReset(message: string) {
        console.log('bindNewMessage, message : ' + this.txtMessage);
        //console.log('bindNewMessage, this : ' + JSON.stringify(this));
        let array = [...this.messages];
        array.push(this.txtMessage);
        this.messages = array;
        this.changeDetector.detectChanges();
        let messagesEl = document.getElementById("messages");
        messagesEl.scrollTop = messagesEl.scrollHeight; //hack !!

        this.txtMessage = '';
    }

    private bindNewMessage(message: SignalrMessage) {
        console.log('bindNewMessage, message : ' + message);
        //console.log('bindNewMessage, this : ' + JSON.stringify(this));
        let array = [...this.messages];
        array.push(message.content);
        this.messages = array;
        this.changeDetector.detectChanges();
        let messagesEl = document.getElementById("messages");
        messagesEl.scrollTop = messagesEl.scrollHeight; //hack !!

        this.txtMessage = '';
    }

    private bindNewUser(username: string) {
        let array = [...this.usernames];
        array.push(username);
        this.usernames = array;
        this.changeDetector.detectChanges();
    }

    private bindUsers(usernames: string[]) {
        this.usernames = usernames;
        this.changeDetector.detectChanges();
    }


    // private getOtherUsers(conn: EstablishedConnection) {
    //     conn.remoteInvoke('GetOtherUsers').subscribe((u) => {
    //         console.log('Chatbox: getUsers : ' + u);
    //         this.usernames = u;
    //         //this._ref.detectChanges();
    //     });
    // }

    private getloggedInUserName() {
        let user = this._authProvider.getContext().getCachedUser();
        if (!user) throw new Error('Failed to get logged in user name. User must be authenticated!');
        return user.profile.given_name;
    }

    private onNewUserSessionReceived() {
        console.log('onNewUserSessionReceived');
    }

    // private sendToServer(conn: EstablishedConnection, message: string): void {
    //     if (this.txtMessage === '') return;
    //     conn.remoteInvoke('SendMessage', this.txtMessage);
    // }

    // private sendBeginNewMessage(conn: EstablishedConnection): void {
    //     conn.remoteInvoke('SendBeginNewMessage');
    // }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
