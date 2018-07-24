import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WpPageComponent } from './wp-page/wp-page.component';
import { HomeContentComponent } from './wp-page/home-content/home-content.component';
import { PostsContentComponent } from './wp-page/posts-content/posts-content.component';
import { WpPagesService } from './wp-pages.service';
import { WpPostsService } from './wp-posts.service';
import { PostsDetailComponent } from './wp-page/posts-content/posts-detail/posts-detail.component';
import { FilterByCategory } from './filterByCategory';
import { WpPostComponent } from './wp-page/wp-post/wp-post.component';
import { HttpIntercept } from './httpintercept';
import { WoocommerceProductsService, WoocommerceHelperService} from 'ngx-wooapi';

@NgModule({
  declarations: [
    AppComponent,
    WpPageComponent,
    HomeContentComponent,
    PostsContentComponent,
    PostsDetailComponent,
    FilterByCategory,
    WpPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    WpPagesService, 
    WpPostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercept,
      multi: true
    },
    WoocommerceProductsService, 
    WoocommerceHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
