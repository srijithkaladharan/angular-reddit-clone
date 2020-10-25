import { Component, OnInit } from '@angular/core';
import { PostModel } from './../post-model';
import { PostService } from './../post.service';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss']
})
export class PostTileComponent implements OnInit {

  posts$: Array<PostModel> = [];
  faComments = faComments;

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(data => {
      this.posts$ = data;
    });
  }

  ngOnInit(): void {
  }

}
