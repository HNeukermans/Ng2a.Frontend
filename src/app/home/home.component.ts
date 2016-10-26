import { Component } from '@angular/core';
import { ValueService } from '../domain/';
import { Title } from './title';
import { XLarge } from './x-large';
import { SignalRService } from '../domain';
import { Message } from 'primeng/primeng';
import { ChatBox } from '../chatbox';
import { AuthProvider } from '../domain';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'

})
export class Home {
  msgs: Message[] = [];
  values: string[] = [];
  value: number = 50;
  user: adal.User = null;

  constructor(
      public valueService: ValueService,
      private _signalRService: SignalRService,
      private _authprovider: AuthProvider) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.user = this._authprovider.getContext().getCachedUser();
    // this.title.getData().subscribe(data => this.data = data);
  }

  load() {
    this.valueService.get().subscribe(r => this.values = r);
  }

  sendMessage() {
    this._signalRService.sendChatMessage('my message !!!');
  }

  login() {
      var context = this._authprovider.getContext();
      context.login();
      this.user = context.getCachedUser();
  }

  logout() {
      var context = this._authprovider.getContext();
      context.logOut();      
  }

  showInfo() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Warn Message', detail:'There are unsaved changes'});
    }

    showError() {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Validation failed'});
    }

    showMultiple() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Message 1', detail:'PrimeNG rocks'});
        this.msgs.push({severity:'info', summary:'Message 2', detail:'PrimeUI rocks'});
        this.msgs.push({severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'});
    }

    clear() {
        this.msgs = [];
    }
  
}
