import { Pipe, PipeTransform } from '@angular/core';
import { WpPost } from './wp-post';
import { WpCategory } from './wp-category';
@Pipe({name: 'filterByCategory'})
export class FilterByCategory implements PipeTransform {
  transform(posts: WpPost[], categoryId: number): WpPost[] {
    if(!categoryId){
        return posts;
    }
    var filteredPosts = [];
    posts.forEach(function(post){
        post.categories.forEach(function(id){
            if(id === categoryId){
                filteredPosts.push(post);
            }
        });
    });
    return filteredPosts;
  }
}