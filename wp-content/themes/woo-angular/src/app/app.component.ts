import { Component } from '@angular/core';
import { WpPage } from './wp-page';
import { WpSiteSettings } from './wp-site-settings';
import { WpPagesService } from './wp-pages.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pages: WpPage [];

  settings: WpSiteSettings;

  getSettings() : void {
    this.WpPagesService.getSiteSettings().
    subscribe(
      (settings: WpSiteSettings) => this.settings = settings,
      (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading settings: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
    )
  }

  getPages() : void {
    this.WpPagesService.getPages().subscribe((pages: WpPage[]) => this.pages = pages,(err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading pages: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`));
  }

  constructor(private WpPagesService: WpPagesService){}
  
  ngOnInit(){
    this.getPages();
    this.getSettings();
  }

}
