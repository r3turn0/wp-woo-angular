import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WpPageComponent } from './wp-page/wp-page.component';
import { PageContentComponent } from './wp-page/page-content/page-content.component';
import { FilterByCategory } from './filterByCategory';
import { HttpIntercept } from './httpintercept';
import { WoocommerceProductsService, WoocommerceOrderService, WoocommerceCouponService, WoocommerceHelperService } from 'ngx-wooapi';
import { AppService } from './app.service';
import { WpApiService } from './wp-api.service';
import { WcApiService } from './wc-api.service';
import { EmailService } from './email.service';

@NgModule({
  declarations: [
    AppComponent,
    WpPageComponent,
    PageContentComponent,
    FilterByCategory,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [
    AppService,
    WpApiService,
    WcApiService,
    EmailService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercept,
      multi: true
    },
    WoocommerceProductsService, 
    WoocommerceOrderService,
    WoocommerceCouponService,
    WoocommerceHelperService,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
