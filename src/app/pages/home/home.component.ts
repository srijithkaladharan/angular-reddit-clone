import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../utils/models/post-model';
import { PostService } from '../../utils/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: PostModel[];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }


  ngOnInit(): void {
  }

}
