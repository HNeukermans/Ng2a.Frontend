import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';
import 'style!css!../../node_modules/primeng/resources/themes/omega/theme.css';
import 'style!css!../../node_modules/font-awesome/css/font-awesome.min.css';
import 'style!css!../../node_modules/primeng/resources/primeng.min.css';
import 'style!css!../../node_modules/@angular/material/core/theming/prebuilt/deeppurple-amber.css';
import { Authentication, AdalConfig } from 'adal-ts';
import { AdalClientConfiguration } from './domain/auth';
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
  conf:AdalConfig;
  constructor(
    public appState: AppState,
    private _router: Router) {
  }

  ngOnInit() {
    console.log('App: init...');
    Authentication.getAadRedirectProcessor().process();

    this.conf = {
      clientId : APP_CONFIG.AD_DIRECTORY_ID,
      tenant: 'hneu70532.onmicrosoft.com',
      redirectUri : window.location + '/',
      postLogoutRedirectUrl : window.location +'/'
    }

    if (Authentication.getContext(this.conf).getUser() != null) {
      console.log('App: login success...');
      location.hash = '#/home';
    }
    else{
       console.log('App: is loggedin is false...');
       Authentication.getContext(this.conf).login();
    }
  }

  logout() {
    Authentication.getContext(this.conf).logout();
  }

  login() {
    Authentication.getContext(this.conf).login();
  }

  goToAppInsights() {
    this._router.navigateByUrl('/appinsights');
  }

  goToHome() {
    this._router.navigateByUrl('/home');
  }

}