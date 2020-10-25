import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../vote.service';
import { VotePayload } from '../vote-payload';
import { VoteType } from '../vote-type';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../post.service';

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;

  constructor(
    private voteService: VoteService,
    private toastr: ToastrService,
    private postService: PostService
  ) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throw (error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    })
  }

}
