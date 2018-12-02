import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WpPageComponent } from './wp-page/wp-page.component';
import { PageContentComponent } from './wp-page/page-content/page-content.component';
import { WpPagesService } from './wp-pages.service';
import { WpPostsService } from './wp-posts.service';
import { WpMediaService } from './wp-media.service';
import { FilterByCategory } from './filterByCategory';
import { HttpIntercept } from './httpintercept';
import { WoocommerceProductsService, WoocommerceOrderService, WoocommerceCouponService, WoocommerceHelperService } from 'ngx-wooapi';

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
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [
    WpPagesService, 
    WpPostsService,
    WpMediaService,
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
