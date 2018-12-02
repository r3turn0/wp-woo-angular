import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { WcPaymentGateway, WcShippingZoneLocations, WcShippingZones, WcShippingZoneMethods, WcShippingMethods, WcTaxRates } from './types';
import { Order, Coupon } from 'ngx-wooapi';
import { environment } from '../environments/environment';

// wcBase: '//www.woo-angular.com/wp-json/wc/v2/'

@Injectable()
export class WcCheckoutService {

  private _wcPayGateways = environment.wcBase + 'payment_gateways';

  private _wcCoupons = environment.wcBase + 'coupons/';

  private _wcShipping = environment.wcBase + 'shipping/';

  private _wcShippingMethods = environment.wcBase + 'shipping_methods/';

  private _wcTaxes = environment.wcBase + 'taxes/';

  private _wcOrders = environment.wcBase + 'orders/';

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

  constructor(private http: HttpClient) { }

}
