import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { InputTextModule, ProgressBarModule, GrowlModule, CheckboxModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { About } from './about';
import { NoContent, EmptyContent } from './no-content';
import { ValueService } from './domain';

import { ChatBox } from './chatbox';
import { Avatar } from './avatar';
import { Home2 } from './home.2';
import { AppInsights } from './appinsights';
import { ChatMessageComponent } from './chat.message/chat.message.component';
import { HubBackend } from './domain/signalr/hub/backend/hub.backend';
import { SignalrEngine } from './domain/signalr/signalr.engine';
import { RealHubBackend } from './domain/signalr/hub/backend/real.hub.backend';
//import { SignalrModule } from './domain/signalr/signalr.module';


console.log('initializing module');
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  ValueService,
  // RealHubBackend,
  // {
  //   provide: SignalrEngine,
  //   useFactory: (backend) => new SignalrEngine(backend),
  //   deps: [RealHubBackend]
  // }
];



type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    About,
    Home2,
    NoContent,
    EmptyContent,
    ChatBox,
    Avatar,
    ChatMessageComponent,
    AppInsights
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    MaterialModule.forRoot(),
    InputTextModule,
    ProgressBarModule,
    GrowlModule,
    CheckboxModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

