import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categoryFilter' })
export class CategoryFilterPipe implements PipeTransform {
  transform(posts: any[], selectedCategory: string): any[] {
    if (selectedCategory === 'All' || !selectedCategory) return posts;
    return posts.filter((post) => post.tag === selectedCategory);
  }
}
