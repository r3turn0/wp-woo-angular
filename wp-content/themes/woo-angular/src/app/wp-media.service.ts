import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WpMedia } from './types';
import { environment } from '../environments/environment';

@Injectable()
export class WpMediaService {

  private _wpBase = environment.wpBase;

  constructor(private http: HttpClient) { }
  getMedia(query:string): Observable<WpMedia[]> {
    return this.http.get<WpMedia[]>(this._wpBase + `media?${query}`);
  }
}

