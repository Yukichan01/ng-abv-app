import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Contact } from '../shared/contact.model';
import { ContactListService } from './contact-list.service';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {  
  contact: Contact;
  
  constructor(private route: ActivatedRoute,private clservice: ContactListService){}
  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.contact = this.clservice.getDetails(id);
  }
}