import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WpPost } from './wp-post';
import { WpCategory } from './wp-category';
import { environment } from '../environments/environment';

@Injectable()
export class WpPostsService {

  private _wpBase = environment.wpBase;

  constructor(private http: HttpClient) { }
      getCategories(query:string):Observable<WpCategory[]> {
        var q = query ? query : '';
        if(q) {
          return this.http.get<WpCategory[]>(this._wpBase + `categories?${q}`);
        }
        else{
          return this.http.get<WpCategory[]>(this._wpBase + 'catogories');
        }
      }
      getPosts(query:string): Observable<WpPost[]> {
        var q = query ? query : '';
        if(q) {
          return this.http.get<WpPost[]>(this._wpBase + `posts?${q}`);
        }
        else{
          return this.http.get<WpPost[]>(this._wpBase + 'posts');
        }
      }
      getPost(slug:string): Observable<WpPost[]> {
        return this.http.get<WpPost[]>(this._wpBase + `posts?slug=${slug}`);
      }

}
