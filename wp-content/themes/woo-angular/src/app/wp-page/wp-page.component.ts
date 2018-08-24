import { Component, OnInit } from '@angular/core';
import { WpPage } from '../wp-page';
import { WpPost } from '../wp-post';
import { WpPagesService } from '../wp-pages.service';
import { WpPostsService } from '../wp-posts.service';
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

  page: WpPage;

  posts: WpPost[];

  getPage() : void {
    this.route.paramMap
    .switchMap( (params: ParamMap) =>
      this.WpPagesService.getPage(params.get('slug'))).
      subscribe(
        (page: WpPage[]) => {this.page = page[0]; },
        (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading pages: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
      );
  }

  getPosts() : void {
    this.WpPostsService.getPosts(null).subscribe(
      (posts: WpPost[]) => { this.posts = posts; },
      (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading posts: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
    );
  }

  constructor(private WpPagesService: WpPagesService, private WpPostsService:WpPostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPage();
    this.getPosts();
  }

}
