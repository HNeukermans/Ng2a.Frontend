import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'avatar',
	template: require('./avatar.component.html'),
	styles: [require('./avatar.component.css')]
})
export class Avatar implements OnInit {

	@Input() name;
	@Input() size: number = 80;

	ngOnInit() { }
}