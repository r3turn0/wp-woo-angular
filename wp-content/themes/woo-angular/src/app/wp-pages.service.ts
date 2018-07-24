import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WpPage } from './wp-page';
import { WpSiteSettings } from './wp-site-settings';
import { environment } from '../environments/environment';

@Injectable()
export class WpPagesService {

  private _wpBase = environment.wpBase;

  constructor(private http: HttpClient) { }
      getPages(): Observable<WpPage[]> {
        return this.http.get<WpPage[]>(this._wpBase + 'pages');
      }
      getPage(slug:string): Observable<WpPage[]> {
        return this.http.get<WpPage[]>(this._wpBase + `pages?slug=${slug}`);
      }
      getSiteSettings() : Observable<WpSiteSettings> {
        return this.http.get<WpSiteSettings>(this._wpBase + 'site-settings')
      }
}

