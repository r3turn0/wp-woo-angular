import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Settings, WpMenus, WpMenu, WcCart } from './types';
import { CookieService } from 'ngx-cookie-service';
import { WpApiService } from './wp-api.service';
import { WcApiService } from './wc-api.service';

@Injectable()
export class AppService {

  private settings = new BehaviorSubject(undefined);
  getSettings = this.settings.asObservable();
  private setSettings(s:Settings){
    this.settings.next(s);
  }

  private menus = new BehaviorSubject([]);
  getMenus = this.menus.asObservable();
  private setMenus(m){
    this.menus.next(m);
  }

  private cart = new BehaviorSubject(undefined);
  getCart = this.cart.asObservable();
  private serializeCart(c) : void {
    if(typeof c === 'string'){
      this.cart.next(undefined);
    }
    else{
      let cartItemKey = Object.keys(c)[0];
      let cartItems = c[cartItemKey];
      this.cart.next(cartItems);
    }
  }

  setCookie(name:string,value:string, duration:number):void{
    if(duration){
      this.CookieService.set(name, value, duration);
    }
    else {
      this.CookieService.set(name, value);
    }
  }

  checkCookie(name:string):boolean{
    return this.CookieService.check(name);
  }

  getCookie(name:string):string {
    return this.CookieService.get(name);
  }

  deleteCookie(name:string) : void {
    this.CookieService.delete(name);
  }

  deleteAllCookies() : void {
    this.CookieService.deleteAll();
  }

  constructor(private WpApiService:WpApiService, private WcApiService:WcApiService, private CookieService:CookieService) { 
    this.WpApiService.getSiteSettings().subscribe((s:Settings) => {
        this.setSettings(s);
      },
      (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading settings: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
    );
    
    this.WpApiService.getMenus().subscribe((menuList: WpMenus[]) => {
      let menuCount = 0;
      let menus = [];
      menuList.forEach( (menu:WpMenus) => {
        this.WpApiService.getMenu(menu.term_id).subscribe((m: WpMenu) => { 
            menus.push(m);
            menuCount++;
            if(menuCount === menuList.length) {
              this.setMenus(menus);
            }
          },
            (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading menu: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
          );
        });
      },
        (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading site menus: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
      );

      this.WcApiService.getCart().subscribe( (c:WcCart) => {
        this.serializeCart(c);
      },
        (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading cart: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
      );
  }

}
