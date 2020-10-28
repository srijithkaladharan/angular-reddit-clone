import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private subredditService: SubredditService, private router: Router) {
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

  goToSubredditPage(pageRoute, id) {
    this.router.navigateByUrl(pageRoute + id);
  }

  goToPage(pageRoute: string) {
    this.router.navigateByUrl(pageRoute);
  }

}
