import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

// wcBase: '//www.woo-angular.com/wp-json/wc/v2/'

@Injectable()
export class WcCartService {

  private _wpCart = environment.wcBase + 'cart/';

  countCartItems():Observable<number> {
    return this.http.get<number>(this._wpCart + 'count-items');
  }

  getCart():Observable<any>{
    return this.http.get<any>(this._wpCart + '?thumb=true');
  }

  addCart(pid:number, qty:number, vid:number, variation:Array<any>, cData:Array<any>):Observable<any>{
    const body = new HttpParams().set('product_id', pid.toString()).set('quantity', qty.toString());
    return this.http.post<any>(this._wpCart + 'add', body.toString(), {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  updateCartItem(key:string, qty:number):Observable<any>{
    const body = new HttpParams().set('cart_item_key', key).set('quantity', qty.toString());
    return this.http.post<any>(this._wpCart + 'cart-item', body.toString(), {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  deleteCartItem(key:string):Observable<any>{
    const body = new HttpParams().set('cart_item_key', key);
    return this.http.delete<any>(this._wpCart + 'cart-item', {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}), params: body});
  }

  clearCart():Observable<any>{
    return this.http.post<any>(this._wpCart + 'clear', null, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  constructor(private http: HttpClient) { }
  
}
