import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateSubredditComponent } from './create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListSubredditsComponent } from './list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { PageRoutingModule } from './page-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HomeComponent,
    CreatePostComponent,
    CreateSubredditComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    UserProfileComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    EditorModule,
    NgbModule
  ]
})
export class PagesModule { }


