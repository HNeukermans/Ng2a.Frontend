import { Component, OnInit, Input } from '@angular/core';
import { SignalrMessage } from '../domain/signalr';

@Component({
	selector: 'chat-message',
	template: require('./chat.message.component.html'),
	styles: [require('./chat.message.component.css')]
})

export class ChatMessageComponent implements OnInit {

	@Input() model: SignalrMessage;

	public imageUrl: string;
	constructor() { }

	ngOnInit() {
		console.log('model: ' + this.model);
		this.imageUrl = 'http://localhost:10772/api/avatars/' + this.model.user;
	}
}