import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {FeedBackComponent} from "./feed-back/feed-back.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {EditorComponent} from "./editor/editor.component";
import {UpdateComponent} from "./update/update.component";
import {AllViewComponent} from "./all-view/all-view.component";


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
    path: 'update/:id',
    component: UpdateComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'allview',
    component: AllViewComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: '',
    component: AllViewComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
