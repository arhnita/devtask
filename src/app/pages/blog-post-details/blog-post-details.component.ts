import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService } from 'src/app/services/blog-service.service';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css']
})
export class BlogPostDetailsComponent implements OnInit {
  post: any;
  comments: any[] = [];
  newComment = { name: '', body: '' };
  noOfComments: number = 0
  errorMessage: string = ''

  constructor(private route: ActivatedRoute, private blogService: BlogServiceService) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    this.blogService.getPostById(postId).subscribe(post => {
      this.post = post;
    });
    this.loadComments(postId);
  }

  loadComments(postId: number): void {
    const storedComments = localStorage.getItem(`comments_${postId}`);
    this.comments = storedComments ? JSON.parse(storedComments) : [];
    this.noOfComments = this.comments.length;
  }

  addComment(): void {
    if (!this.newComment.name.trim() || !this.newComment.body.trim()) {
      this.errorMessage = 'Both name and comment body are required.';
      return;
    }
    this.errorMessage = '';

    const comment = { ...this.newComment, postId: this.post.id, id: this.comments.length + 1 };
    this.comments.push(comment);
    localStorage.setItem(`comments_${this.post.id}`, JSON.stringify(this.comments));
    this.newComment = { name: '', body: '' };
    this.noOfComments = this.comments.length;
  }

  clearComments(postId: number): void {
    localStorage.removeItem(`comments_${postId}`);
    this.loadComments(postId); 
  }
}
