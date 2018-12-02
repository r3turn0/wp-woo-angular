import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WpPost, WpCategory } from './types';
import { ProductReview } from 'ngx-wooapi';
import { environment } from '../environments/environment';

@Injectable()
export class WpPostsService {

  private _wpBase = environment.wpBase;

  private _wcProductReview = environment.wcBase + '/products/';

  constructor(private http: HttpClient) { }
  
  getCategories(query:string):Observable<WpCategory[]> {
    if(query) {
      return this.http.get<WpCategory[]>(this._wpBase + `categories?${query}`);
    }
    else{
      return this.http.get<WpCategory[]>(this._wpBase + 'catogories');
    }
  }
  
  getPosts(query:string): Observable<WpPost[]> {
    if(query) {
      return this.http.get<WpPost[]>(this._wpBase + `posts?${query}`);
    }
    else{
      return this.http.get<WpPost[]>(this._wpBase + 'posts');
    }
  }
  
  getPost(slug:string): Observable<WpPost[]> {
    return this.http.get<WpPost[]>(this._wpBase + `posts?slug=${slug}`);
  }
  
  createProductReview(id:number, r:ProductReview):Observable<ProductReview> {
    return this.http.post<ProductReview>(this._wcProductReview + `${id}/reviews`, r, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
}
