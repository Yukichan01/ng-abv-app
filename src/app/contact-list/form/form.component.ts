import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/shared/contact.model';
import { ContactListService } from '../contact-list.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm: NgForm;
  subscription: Subscription;
  updateMode = false;
  updateItemIndex: number;
  updateItem: Contact;
  
  constructor(private clService: ContactListService, private http: HttpClient){}
  ngOnInit(){ 
    this.subscription = this.clService.startUpdate.subscribe(
      (index: number) =>{
        this.updateItemIndex = index;
        this.updateMode = true;
        this.updateItem = this.clService.getIndex(index);
        this.slForm.setValue({id: this.updateItem.id, name: this.updateItem.name,
          email: this.updateItem.email, phone: this.updateItem.phone})});
  }
  onAddItem(form: NgForm){
    const value = form.value;
    const contact = new Contact(value.id,value.name,value.email, value.phone);
    if(this.updateMode){
      this.clService.updateInfo(this.updateItemIndex,contact);
      this.http.post('https://jsonplaceholder.typicode.com/updateInfo/' + this.updateItemIndex,contact).subscribe();
    }
    else{
      this.clService.addContacts(contact);
      this.http.post('https://jsonplaceholder.typicode.com/addInfo',contact).subscribe();
    }  
    this.updateMode = false;
    form.reset();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  } 
}