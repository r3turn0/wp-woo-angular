import { Component, OnInit } from '@angular/core';
import { WpPage } from '../wp-page';
import { WpPagesService } from '../wp-pages.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wp-page',
  templateUrl: './wp-page.component.html',
  styleUrls: ['./wp-page.component.css']
})
export class WpPageComponent implements OnInit {

  private host = environment.host;

  pages: WpPage[];

  page: WpPage;
  
  nextPage: WpPage;
  
  prevPage: WpPage;
  
  getNextPage(page:WpPage) : void {
    //console.log('pages: ', pages);
    const order = page.menu_order;
    //console.log('currentOrder: ' + order);
    var nextIdx = order + 1;
    //console.log('nextIdx: ' + nextIdx);
    if(this.pages){
      if(nextIdx >= this.pages.length){
        nextIdx = 0;
      }
      var nextPage;
      this.pages.forEach(function(page){
        if(nextIdx === page.menu_order){
          nextPage = page;
        }
      });
      this.WpPagesService.getPage(nextPage.slug).subscribe( (page:WpPage[]) => this.nextPage = page[0]);
    }
  }

  getPrevPage(page:WpPage) : void {
    //console.log('pages: ', pages);
    const order = page.menu_order;
    //console.log('currentOrder: ' + order);
    var prevIdx = order - 1;
    //console.log('prevIdx: ' + prevIdx);
    if(this.pages){
      if(prevIdx < 0){
        prevIdx = this.pages.length - 1;
      }
      var prevPage;
      this.pages.forEach(function(page){
        if(prevIdx === page.menu_order){
          prevPage = page;
        }
      });
      this.WpPagesService.getPage(prevPage.slug).subscribe( (page:WpPage[]) => this.prevPage = page[0]);
    }
  }

  getPage() : void {
    this.route.paramMap
    .switchMap( (params: ParamMap) =>
      this.WpPagesService.getPage(params.get('slug'))).
      subscribe(
        (page: WpPage[]) => {this.page = page[0]; this.redirectHome(this.page)},
        (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading pages: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
      );
  }

  redirectHome(page) : void {
    if(!page){
      window.location.replace(this.host);
    }
    else{
      //this.getNextPage(page); 
      //this.getPrevPage(page);
    }
  }

  pageInit() : void {
    this.WpPagesService.getPages().subscribe( (pages:WpPage[]) => {this.pages = pages; this.getPage(); } );
  }

  constructor(private WpPagesService: WpPagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pageInit();
  }

}
