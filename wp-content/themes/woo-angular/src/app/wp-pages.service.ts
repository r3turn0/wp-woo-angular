import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Settings, WpPage } from './types';
import { environment } from '../environments/environment';

// USEFUL QUERIES
// Get parent pages: parent=0
// Get child  pages order by menu order ASC: parent=${parentId}&orderby=menu_order&order=asc
// Get page by ID: include=${id}

@Injectable()
export class WpPagesService {

  private _wpBase = environment.wpBase;

  constructor(private http: HttpClient) { }

  getPages(query:string): Observable<WpPage[]> {
    if(query) { 
      return this.http.get<WpPage[]>(this._wpBase + `pages?${query}`);
    }
    else {
      return this.http.get<WpPage[]>(this._wpBase + 'pages');
    }
  }

  getPage(slug:string): Observable<WpPage[]> {
    return this.http.get<WpPage[]>(this._wpBase + `pages?slug=${slug}`);
  }

  getSiteSettings() : Observable<Settings> {
    return this.http.get<Settings>(this._wpBase + 'site-settings')
  }
}

