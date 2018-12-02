import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WpMenus, WpMenu } from './types';
import { environment } from '../environments/environment';

@Injectable()
export class WpMenuService {

  private _wpMenuBase = environment.wpMenuBase;

  constructor(private http: HttpClient) { }

  getMenus(): Observable<WpMenus[]> {
    return this.http.get<WpMenus[]>(this._wpMenuBase);
  }
  getMenu(termId:number) : Observable<WpMenu> {
    return this.http.get<WpMenu>(this._wpMenuBase + `${termId}`);
  }

}


