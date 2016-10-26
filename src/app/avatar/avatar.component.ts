import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'avatar',
	templateUrl: 'avatar.component.html',
	styleUrls: ['avatar.component.css']
})
export class Avatar implements OnInit {

	@Input() name;
	@Input() size: number = 80;

	ngOnInit() { }
}