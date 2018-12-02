import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Settings, WpPage, WpMenus, WpMenu, WpPost, WpCategory, WpMedia } from './types';
import { environment } from '../environments/environment';

@Injectable()
export class WpApiService {

  private _wpBase = environment.wpBase;
  private _api = environment.api;
  private _wpMenuBase = environment.wpMenuBase;

  // SETTINGS
  getSiteSettings() : Observable<Settings> {
    return this.http.get<Settings>(this._wpBase + 'site-settings')
  }

  // USER
  getNonce():Observable<any>{
    return this.http.get<any>(this._api + 'get_nonce/?controller=user&method=register');
  }
  registerUser(email:string, password:string, nonce:string):Observable<any> { // Expires in 1 day
    const body = new HttpParams().set('username', email).set('email', email).set('display_name', email).set('user_pass', password).set('nonce', nonce).set('notify', 'no').set('seconds', '86400');
    return this.http.post<any>(this._api  + 'user/register/', body, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }
  retrievePass(userLogin:string):Observable<any>{
    return this.http.get<any>(this._api + `user/retrieve_password/?user_login=${userLogin}`);
  }
  generateAuthCookie(email:string, password:string, rememberUser:boolean):Observable<any> { // Default valid for 14 days, set seconds to change this 
    const body = new HttpParams().set('username', email).set('password', password);
    if(rememberUser === false) {
      body.set('seconds', '86400');
    }
    return this.http.post<any>(this._api  + 'user/generate_auth_cookie/', body, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }
  validateAuthCookie(cookie:string):Observable<any>{
    const body = new HttpParams().set('cookie', cookie);
    return this.http.post<any>(this._api  + 'user/validate_auth_cookie/', body, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  // PAGES
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

  // MENUS
  getMenus(): Observable<WpMenus[]> {
    return this.http.get<WpMenus[]>(this._wpMenuBase);
  }
  getMenu(termId:number) : Observable<WpMenu> {
    return this.http.get<WpMenu>(this._wpMenuBase + `${termId}`);
  }
  
  // POSTS
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
  getCategories(query:string):Observable<WpCategory[]> {
    if(query) {
      return this.http.get<WpCategory[]>(this._wpBase + `categories?${query}`);
    }
    else{
      return this.http.get<WpCategory[]>(this._wpBase + 'catogories');
    }
  }

  // MEDIA
  getMedia(query:string): Observable<WpMedia[]> {
    return this.http.get<WpMedia[]>(this._wpBase + `media?${query}`);
  }
  
  constructor(private http: HttpClient) { }

}
