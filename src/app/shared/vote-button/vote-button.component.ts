import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;

  constructor() { }

  ngOnInit(): void {
  }

  upvotePost() {

  }

  downvotePost() {

  }

}
