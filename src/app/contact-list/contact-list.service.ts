import { EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from "../shared/contact.model";
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
export class ContactListService{

    constructor(private http: HttpClient){}
    contactChanged = new EventEmitter<Contact[]>();
    startUpdate = new Subject<number>(); 
    contacts: Contact[] = [];

    fetchPosts(){
        this.http.get<Contact>('https://jsonplaceholder.typicode.com/users')
        .pipe(map(responseData => {
          const infoArray: Contact[] = [];
          for(const id in responseData){
            if(responseData.hasOwnProperty(id)){
              infoArray.push({...responseData[id]})}}
          return infoArray.slice();
        }))
        .subscribe(posts =>{this.contacts = posts;});}  
      getContacts(){
          return this.contacts.slice();
      }
      getDetails(id:number): Contact{
        return this.contacts.find(e=> e.id === id);
      }
      addContacts(contact: Contact){
          this.contacts.push(contact);
          this.contactChanged.emit(this.contacts.slice());
      }
      getIndex(index:number){
          return this.contacts[index];
      }
      updateInfo(index: number,contact: Contact){
        this.contacts[index] = contact;
        this.contactChanged.next(this.contacts.slice());
      }
      deleteContact(index: number){
          this.contacts.splice(index,1);
          this.contactChanged.next(this.contacts.slice());
          this.http.post('https://jsonplaceholder.typicode.com/deleteInfo',Contact).subscribe(responseData =>{
      console.log(responseData);});
      }
}