// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { RealHubBackend } from './hub/backend/real.hub.backend';
// import { SignalrEngine } from './signalr.engine';
// import { SignalrConfig } from './signalr.configuration';

// @NgModule({
//     providers: [
//         RealHubBackend,
//         {
//             provide: SignalrEngine,
//             useFactory: (backend) => new SignalrEngine(backend),
//             deps: [RealHubBackend]
//         }]
// })
// export class SignalrModule {
//     public static withClient(client: SignalrConfig): ModuleWithProviders {
//         return {
//             ngModule: SignalrModule,
//             providers: [
//                 {
//                     provide: SignalrConfig,
//                     useValue: client
//                 }
//             ],
//         };
//     }
// }