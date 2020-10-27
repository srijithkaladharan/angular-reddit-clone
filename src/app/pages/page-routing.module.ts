import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateSubredditComponent } from './create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListSubredditsComponent } from './list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from '../utils/services/auth/auth.guard';


const routes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'user-profile/:name',
            component: UserProfileComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'view-post/:id',
            component: ViewPostComponent
        },
        {
            path: 'list-subreddits',
            component: ListSubredditsComponent,
        },
        {
            path: 'create-post',
            component: CreatePostComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'create-subreddit',
            component: CreateSubredditComponent,
            canActivate: [AuthGuard]
        },
        {
            path: "sign-up",
            component: SignupComponent
        },
        {
            path: "login",
            component: LoginComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }