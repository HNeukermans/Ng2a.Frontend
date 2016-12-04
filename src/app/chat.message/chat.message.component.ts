import { Component, OnInit, Input } from '@angular/core';
import { SignalrMessage } from '../domain/signalr';

@Component({
	selector: 'chat-message',
	templateUrl: 'chat.message.component.html',
	styleUrls: ['chat.message.component.css']
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