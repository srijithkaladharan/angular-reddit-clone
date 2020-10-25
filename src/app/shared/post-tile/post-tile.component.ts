import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from './../post-model';
import { PostService } from './../post.service';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss']
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts$: PostModel[];

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  goToPost(postId: number) {
    this.router.navigateByUrl('/view-post/' + postId);
  }

}
