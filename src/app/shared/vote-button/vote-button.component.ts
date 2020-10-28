import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../../utils/models/post-model';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../../utils/services/vote/vote.service';
import { VotePayload } from '../../utils/models/vote-payload';
import { VoteType } from '../../utils/models/vote-type';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../utils/services/post/post.service';

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements AfterViewInit {

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

  ngAfterViewInit(): void {
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
      console.log(error);
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
