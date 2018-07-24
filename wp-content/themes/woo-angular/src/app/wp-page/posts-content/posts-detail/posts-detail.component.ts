import { Component, OnInit, Input } from '@angular/core';
import { WpPostsService } from '../../../wp-posts.service';
import { WpPost } from '../../../wp-post';
import { WpCategory } from '../../../wp-category';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {

  categories: WpCategory[];

  posts: WpPost[];

  @Input() categoryId: number;
  
  @Input() categoryName: string;

  getPosts() : void {
    this.WpPostsService.getPosts().subscribe(
      (posts: WpPost[]) => { this.posts = posts; this.transformCatIdsToNames(this.posts, this.categories) },
      (err: HttpErrorResponse) => err.error instanceof Error ? console.log('Error loading posts: ', err.error.message) : console.log(`Backend returned code: ${err.status} body was: ${err.error}`)
    );
  }

  getCategories() : void {
    this.WpPostsService.getCategories().subscribe(
      (categories:WpCategory[]) => {this.categories = categories; this.getPosts(); }
    );
  }

  transformCatIdsToNames(posts, categories) : void {
    posts.forEach(function(post){
      var categoryNames = [];
      categories.forEach(function(cat){
        if(post.categories.indexOf(cat.id) !== -1 && cat.id !== 1){
          categoryNames.push(cat.name);
        }
      });
      post['categoryNames'] = categoryNames;
    });
  }

  constructor(private WpPostsService:WpPostsService ) { }

  ngOnInit() {
    this.getCategories();
  }

}
