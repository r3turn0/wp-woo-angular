import { Component } from '@angular/core';
import { Settings, WpPage, WcCart, WpMenu } from './types';
import { AppService } from './app.service';
import { WpApiService } from './wp-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  settings: Settings;

  cart: WcCart;

  menus: WpMenu[];
  
  pages: WpPage [];

  getSettings() : void {
    this.AppService.getSettings.
    subscribe(
      (settings: Settings) => { 
        this.settings = settings 
      }
    )
  }

  getCart() : void {
    this.AppService.getCart.subscribe((cart:WcCart) => {
      this.cart = cart;
    });
  }

  getMenu() : void {
    this.AppService.getMenus.subscribe((menus:WpMenu[]) => {
      this.menus = menus;
    });
  }

  constructor(private AppService: AppService){}
  
  ngOnInit(){
    this.getSettings();
    this.getCart();
  }

}
