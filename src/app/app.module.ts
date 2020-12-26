import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ContactListService } from './contact-list/contact-list.service';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './contact-list/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailsComponent } from './contact-list/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    ContactListComponent,
    HomeComponent,
    NotFoundComponent,
    ContactDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule, 
    FormsModule,
    AppRoutingModule
  ],
  providers: [ContactListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
