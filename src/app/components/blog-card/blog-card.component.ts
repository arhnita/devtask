import { Component, ViewChild } from '@angular/core';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {

  posts: any[] = [];
  paginatedPosts: any[] = [];
  filteredPosts: any[] = [];
  currentPage: number = 0;
  postsPerPage: number = 5;
  totalPosts: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private blogService: BlogServiceService ){

  }
  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(filterValue) || post.body.toLowerCase().includes(filterValue)
    );
    this.totalPosts = this.filteredPosts.length;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.setPage();
  }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
      this.filteredPosts = data;
      this.totalPosts = data.length;
      this.setPage();
    });
  }

  setPage(event?: PageEvent): void {
    this.currentPage = event ? event.pageIndex : this.currentPage;
    this.postsPerPage = event ? event.pageSize : this.postsPerPage;
    const start = this.currentPage * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.paginatedPosts = this.filteredPosts.slice(start, end);
  }

}
