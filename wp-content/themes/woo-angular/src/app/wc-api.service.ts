import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WcCustomer, WcPaymentGateway, WcShippingZoneLocations, WcShippingZones, WcShippingZoneMethods, WcShippingMethods, WcTaxRates, WcCountry } from './types';
import { Order, Coupon, ProductReview } from 'ngx-wooapi';
import { environment } from '../environments/environment';

@Injectable()
export class WcApiService {

  private _wcCustomer = environment.wcBase + 'customers/';
  private _wcData = environment.wcBase + 'data/';
  private _wcOrders = environment.wcBase + 'orders/';
  private _wpCart = environment.wcBase + 'cart/';
  private _wcPayGateways = environment.wcBase + 'payment_gateways';
  private _wcCoupons = environment.wcBase + 'coupons/';
  private _wcShipping = environment.wcBase + 'shipping/';
  private _wcShippingMethods = environment.wcBase + 'shipping_methods/';
  private _wcTaxes = environment.wcBase + 'taxes/';
  private _wcProductReview = environment.wcBase + '/products/';

  // WOOCOMMERCE CUSTOMERS API
  getCustomer(id:number):Observable<WcCustomer> {
    return this.http.get<WcCustomer>(this._wcCustomer + `${id}`);
  }
  updateCustomer(id:number, data:{}):Observable<WcCustomer> {
    return this.http.put<WcCustomer>(this._wcCustomer + `${id}`, data, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  getCustomerOrders(id:number):Observable<any> {
    return this.http.get<Order[]>(this._wcOrders.substring(0,this._wcOrders.length - 1) + `?customer=${id}`);
  }
  getBaseCountry(countryCode:string):Observable<any> {
    return this.http.get<WcCountry[]>(this._wcData + `countries/${countryCode}`);
  }

  // WOOCOMMERCE CART API
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

  // WOOCOMMERCE CHECKOUT API
  getPaymentGateways():Observable<any> {
    return this.http.get<WcPaymentGateway[]>(this._wcPayGateways);
  }
  getCoupons():Observable<any> {
    return this.http.get<Coupon[]>(this._wcCoupons);
  }
  getShippingZones():Observable<any> {
    return this.http.get<WcShippingZones[]>(this._wcShipping + 'zones');
  }
  getShippingZoneLocations(id:number):Observable<any> {
    return this.http.get<WcShippingZoneLocations[]>(this._wcShipping + `zones/${id}/locations`);
  }
  getShippingZoneMethods(id:number):Observable<any> {
    return this.http.get<WcShippingZoneMethods[]>(this._wcShipping + `zones/${id}/methods`);
  }
  getShippingMethods():Observable<any> {
    return this.http.get<WcShippingMethods[]>(this._wcShippingMethods);
  }
  getTaxRates():Observable<any> {
    return this.http.get<WcTaxRates[]>(this._wcTaxes);
  }
  createOrder(o:Order):Observable<Order> {
    return this.http.post<Order>(this._wcOrders, o, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  // WOOCOMMERCE PRODUCTS API
  createProductReview(id:number, r:ProductReview):Observable<ProductReview> {
    return this.http.post<ProductReview>(this._wcProductReview + `${id}/reviews`, r, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  constructor(private http: HttpClient) { }

}
