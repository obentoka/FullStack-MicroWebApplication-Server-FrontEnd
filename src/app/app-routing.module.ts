import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogsComponent} from "./blogs/blogs.component";
import {FeedBackComponent} from "./feed-back/feed-back.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'blogs',
    component:BlogsComponent
  },
  {
    path:'feedback',
    component:FeedBackComponent
  },
  {
    path:'',
    component:BlogsComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
