import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/utils/models/subreddit-response';
import { SubredditService } from '../../utils/services/subreddit/subreddit.service';

@Component({
  selector: 'subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.scss']
})
export class SubredditSideBarComponent implements OnInit {
  displayViewAll: boolean;

  subreddits: Array<SubredditModel> = [];

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length >= 4) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  ngOnInit(): void {
  }

}
