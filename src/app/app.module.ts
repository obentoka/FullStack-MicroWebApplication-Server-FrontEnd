import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditorComponent } from './editor/editor.component';
import { UpdateComponent } from './update/update.component';
import { AllViewComponent } from './all-view/all-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    ViewComponent,
    LoginComponent,
    SignUpComponent,
    EditorComponent,
    UpdateComponent,
    AllViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
