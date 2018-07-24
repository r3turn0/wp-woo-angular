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
      getCategories():Observable<WpCategory[]> {
        return this.http.get<WpCategory[]>(this._wpBase + 'categories');
      }
      getPosts(): Observable<WpPost[]> {
        return this.http.get<WpPost[]>(this._wpBase + 'posts');
      }
      getPost(slug:string): Observable<WpPost[]> {
        return this.http.get<WpPost[]>(this._wpBase + `posts?slug=${slug}`);
      }

}
