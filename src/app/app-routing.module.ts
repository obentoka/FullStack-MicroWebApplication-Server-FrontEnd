import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogsComponent} from "./blogs/blogs.component";
import {FeedBackComponent} from "./feed-back/feed-back.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {EditorComponent} from "./editor/editor.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'feedback',
    component: FeedBackComponent
  },
  {
    path: '',
    component: BlogsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
