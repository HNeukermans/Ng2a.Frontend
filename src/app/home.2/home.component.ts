import { Component } from '@angular/core';
import { AuthProvider, SignalRService } from '../domain';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class Home2 {

  user: any = null;
  constructor(
    private _authprovider: AuthProvider,
    private _signalrService:  SignalRService) {
  }

  ngOnInit() {
    console.log('hello `Home 2` component');
  }

  logout() {
      let context = this._authprovider.getContext();
      context.logOut();
  }

  login() {
      let context = this._authprovider.getContext();
      context.login();
      context.getCachedUser();
  }

  fakeSession() {
       this._signalrService.signalNewUserSession('Fake Frank');
       let context = this._authprovider.getContext();
       this.user = context.getCachedUser();
  }
}
