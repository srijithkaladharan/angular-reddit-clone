import { Component, OnInit } from '@angular/core';
import { PostService } from '../../utils/services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/utils/models/post-model';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from '../../utils/models/comment.payload';
import { CommentService } from '../../utils/services/comment/comment.service';
import { AuthService } from 'src/app/utils/services/auth/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  commentForm: FormGroup;
  isLoggedIn: boolean;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
  ) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    };

    this.post = {
      id: this.postId,
      postName: '',
      description: '',
      voteCount: 0,
      username: '',
      subredditName: '',
      commentCount: 0,
      duration: ''
    }

  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      console.log("ERROR MESSAGE", error);
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

}
