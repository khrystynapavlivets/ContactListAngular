import { Component } from '@angular/core';
import { ContactService } from '../../shared/services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../shared/interface/contact.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact-details',
  imports: [CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  public currentContact!: Contact;

  constructor(
    public contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      if (response['contactInfo']) {
        this.currentContact = response['contactInfo'];
        console.log(this.currentContact);
      }
    })
  }
}
