import { Component, OnInit,Input } from '@angular/core';
import { WpPage } from '../../wp-page';
import { WpCategory } from '../../wp-category';
import { WpPostsService } from '../../wp-posts.service';

@Component({
  selector: 'app-posts-content',
  templateUrl: './posts-content.component.html',
  styleUrls: ['./posts-content.component.css']
})
export class PostsContentComponent implements OnInit {

  @Input() page: WpPage;
  
  categories: WpCategory[];
  
  slug = 'portfolio';

  selectedCategoryId: number;
  
  selectedCategoryName: string;

  getCategories() : void {
    this.WpPostsService.getCategories().subscribe(
      (categories:WpCategory[]) => {this.categories = categories; this.selectedCategoryId = 1; this.selectedCategoryName = "All"}
    );
  }

  setSelectedCategory(id:number, name:string) : void {
    this.selectedCategoryId = id;
    this.selectedCategoryName = name;
    //console.log(this.selectedCategory);
  }

  constructor(private WpPostsService:WpPostsService) { }

  ngOnInit() {
      this.getCategories();
  }

}
