import { of, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(public http: HttpClient) { }

  get(): Observable<any> {
    //return this.http.get(`${environment.BASE_URL}users`);
    return of ([
      {
        "icon":"icon",
        "menuText":"company profile",
        "router":"",
        "children":[]
      },
      {
        "icon":"icon",
        "menuText":"Flight schedule",
        "router":"",
        "children":[]
      },
      {
        "icon":"icon",
        "menuText":"Glycol storage",
        "router":"",
        "children":[]
      }
    ]);
	}
}
