import { Component, OnInit } from '@angular/core';
import { WpPost } from '../../wp-post';
import { WpPostsService } from '../../wp-posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wp-post',
  templateUrl: './wp-post.component.html',
  styleUrls: ['./wp-post.component.css']
})
export class WpPostComponent implements OnInit {

  post: WpPost;

  goBack() : void {
    this.location.back();
  }

  getPost() : void {
    this.route.paramMap
    .switchMap( (params: ParamMap) =>
      this.WpPostsService.getPost(params.get('slug'))).
      subscribe(
        (post: WpPost[]) => {this.post = post[0]; },
        (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading post: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
      )
  }

  constructor(private WpPostsService: WpPostsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getPost();
  }

}
