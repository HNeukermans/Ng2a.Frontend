import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ValueService {
  constructor(private http: Http) {

  }

  get(): Observable<string[]> {
    return this.http.get('http://localhost:10772/api/values')
    .map(r => <string[]>r.json());
  }

}
