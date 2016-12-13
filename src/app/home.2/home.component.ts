import { Component } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class Home2 {

  user: any = null;
  constructor() {
  }

  ngOnInit() {
    console.log('hello `Home 2` component');
    let env: string = APP_CONFIG.ENV;
    if (env === 'prod') {
      (<any>window).appInsights.trackPageView('Home');
    }
  }


  fakeSession() {
    //this._signalrService.signalNewUserSession('Fake Frank');
    
    
  }
}
