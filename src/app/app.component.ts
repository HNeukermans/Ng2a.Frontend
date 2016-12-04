import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';
import { AuthProvider } from './domain';
import 'style!css!../../node_modules/primeng/resources/themes/omega/theme.css';
import 'style!css!../../node_modules/font-awesome/css/font-awesome.min.css';
import 'style!css!../../node_modules/primeng/resources/primeng.min.css';
import 'style!css!../../node_modules/@angular/material/core/theming/prebuilt/deeppurple-amber.css';

/*
 * App Component,
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html'
})
export class App {
  user: any = null;
  constructor(
    public appState: AppState,
    private _router: Router,
    private _authProvider: AuthProvider) {
  }

  ngOnInit() {
    console.log('App: init...');
    let context = this._authProvider.getContext();
    console.log('context.loginInProgress ' + context.loginInProgress());
    context.processAdRedirect();

    if (context.isLoggedIn() === true) {
      console.log('App: login success...');
      location.hash = '#/home';
    }

    if (context.isLoggedIn() === false) {
      console.log('App: is loggedin is false...');
      context.login();
    }
  }

  logout() {
    let context = this._authProvider.getContext();
    context.logOut();
  }

  login() {
    let context = this._authProvider.getContext();
    context.login();
    context.getCachedUser();
  }

  goToAppInsights() {
    this._router.navigateByUrl('/appinsights');
  }

  goToHome() {
    this._router.navigateByUrl('/home');
  }

}