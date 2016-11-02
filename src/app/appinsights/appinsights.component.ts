import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'appinsights',
	templateUrl: 'appinsights.component.html'
})

export class AppInsights implements OnInit {

	ngOnInit() {
		let env: string = APP_CONFIG.ENV;
		if (env === 'prod') {
			(<any>window).appInsights.trackPageView('AppInsights');
		}
		// if ('production' !== ENV) {
		// 	(<any>window).appInsights.trackPageView('AppInsights');
		// }
	}

	trackException() {
		try {
			throw Error('trackEvent');
		} catch (error) {
			(<any>window).appInsights.trackException(error);
		}
	}

	trackEvent() {
		(<any>window).appInsights.trackEvent("TrackEvent clicked");
	}

	flush() {
		(<any>window).appInsights.flush();
	}
}