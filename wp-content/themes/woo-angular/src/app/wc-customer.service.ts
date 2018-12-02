import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WcCustomer, WcCountry } from './types';
import { Order } from 'ngx-wooapi';
import { environment } from '../environments/environment';

// wcBase: '//www.woo-angular.com/wp-json/wc/v2/'

@Injectable()
export class WcCustomerService {

  // wcBase: '//www.woo-angular.com/wp-json/wc/v2/'
  
  private _wcCustomer = environment.wcBase + 'customers/';

  private _api = environment.api;

  private _wcOrder = environment.wcBase + 'orders/';

  private _wcData = environment.wcBase + 'data/';

  // API USER

  getNonce():Observable<any>{
    return this.http.get<any>(this._api + 'get_nonce/?controller=user&method=register');
  }

  // Expires in 1 day
  registerUser(email:string, password:string, nonce:string):Observable<any>{
    const body = new HttpParams().set('username', email).set('email', email).set('display_name', email).set('user_pass', password).set('nonce', nonce).set('notify', 'no').set('seconds', '86400');
    return this.http.post<any>(this._api  + 'user/register/', body, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  retrievePass(userLogin:string):Observable<any>{
    return this.http.get<any>(this._api + `user/retrieve_password/?user_login=${userLogin}`);
  }
  
  // Default valid for 14 days, set seconds to change this 
  generateAuthCookie(email:string, password:string, rememberUser:boolean):Observable<any> {
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

  // WOOCOMMERCE CUSTOMER

  getCustomer(id:number):Observable<WcCustomer> {
    return this.http.get<WcCustomer>(this._wcCustomer + `${id}`);
  }

  updateCustomer(id:number, data:{}):Observable<WcCustomer> {
    return this.http.put<WcCustomer>(this._wcCustomer + `${id}`, data, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getCustomerOrders(id:number):Observable<any> {
    return this.http.get<Order[]>(this._wcOrder.substring(0,this._wcOrder.length - 1) + `?customer=${id}`);
  }

  getBaseCountry(countryCode:string):Observable<any> {
    return this.http.get<WcCountry[]>(this._wcData + `countries/${countryCode}`);
  }

  constructor(private http: HttpClient) { }

}
