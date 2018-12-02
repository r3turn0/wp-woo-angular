import { Component } from '@angular/core';
import { Settings, WpPage } from './types';
import { WpApiService } from './wp-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pages: WpPage [];

  settings: Settings;

  getSettings() : void {
    this.WpApiService.getSiteSettings().
    subscribe(
      (settings: Settings) => this.settings = settings,
      (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading settings: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
    )
  }

  getPages() : void {
    this.WpApiService.getPages(null).subscribe((pages: WpPage[]) => this.pages = pages,(err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading pages: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`));
  }

  constructor(private WpApiService: WpApiService){}
  
  ngOnInit(){
    this.getPages();
    this.getSettings();
  }

}
