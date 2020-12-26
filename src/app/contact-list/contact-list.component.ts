import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../shared/contact.model'
import { ContactListService } from './contact-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']})

export class ContactListComponent implements OnInit, OnDestroy { 
  contacts: Contact[];
  @ViewChild('f',{static:false}) form:NgForm;
  
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Contact;
  constructor(private clService: ContactListService, private http: HttpClient, private router:Router){}
  ngOnInit(){
    this.fetchPosts();
    this.clService.fetchPosts();
    this.contacts = this.clService.getContacts();
    this.clService.contactChanged.subscribe(
      (contact: Contact[])=>{this.contacts = contact;})
    this.subscription = this.clService.startUpdate
    .subscribe((index: number) =>{this.editedItemIndex = index;})
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onUpdateInfo(index: number){
    this.clService.startUpdate.next(index);
  }
  onDelete(){
    this.clService.deleteContact(this.editedItemIndex);
  }
  onView(detailsId: number){
    this.router.navigate(['/contact-list',detailsId]);
  }
  fetchPosts(){
    this.http.get<Contact>('https://jsonplaceholder.typicode.com/users')
    .pipe(map(responseData => {
      const infoArray: Contact[] = [];
      for(const id in responseData){
        if(responseData.hasOwnProperty(id)){infoArray.push({...responseData[id]})}}
      return infoArray.slice();
    }))
    .subscribe(posts =>{ this.contacts = posts;});
    }  
  }