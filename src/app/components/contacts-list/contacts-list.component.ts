import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateContactComponent } from '../dialog-create-contact/dialog-create-contact.component';
import { DialogEditContactComponent } from '../dialog-edit-contact/dialog-edit-contact.component';
import { Contact } from '../../shared/interface/contact.interface';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../shared/services/contact.service';



@Component({
  selector: 'app-contacts-list',
  imports: [FormsModule, RouterModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})

export class ContactsListComponent {

  public searchContact: string = '';
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [...this.contacts];

  constructor(private dialog: MatDialog,
    public contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  AddContact() {
    return this.openDialogCreate();

  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    this.contactService.saveContactsLocalStorage(this.contacts);
    this.filterContacts();
  }

  editContact(contact: Contact) {
    return this.openDialogEdit(contact);
  }


  // saveContacts(): void {
  //   localStorage.setItem('contacts', JSON.stringify(this.contacts));
  // }

  loadContacts(): void {
    const storedContacts = this.contactService.loadContactsLocalStorage();
    if (storedContacts.length > 0) {
      this.contacts = storedContacts;
    } else {
      this.contacts = this.contactService.getContacts();
    }
    this.filteredContacts = [...this.contacts];
    // const storedContacts = localStorage.getItem('contacts');
    // if (storedContacts) {
    //   this.contacts = JSON.parse(storedContacts);
    // } else {
    //   this.contacts = this.contactService.getContacts(id); 
    // }
    // this.filteredContacts = [...this.contacts]; 
  }

  filterContacts(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      [contact.firstName, contact.lastName, contact.phoneNumber]
        .some(item => item.toLowerCase().includes(this.searchContact.toLowerCase()))
    );
  }

  openDialogEdit(contact: Contact): void {
    const dialogRef: MatDialogRef<DialogEditContactComponent> = this.dialog.open(DialogEditContactComponent, {
      width: '800px',
      data: contact
    });
    dialogRef.afterClosed().subscribe((updateContact: Contact) => {
      if (updateContact) {
        const index = this.contacts.findIndex(contact => contact.id === updateContact.id);
        this.contacts[index] = updateContact;
        this.contactService.saveContactsLocalStorage(this.contacts);
        this.filterContacts();
      }
    })
  }

  openDialogCreate() {
    const dialogRef: MatDialogRef<DialogCreateContactComponent> = this.dialog.open(DialogCreateContactComponent, {
      width: '400px'
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newContact: Contact = {
          id: this.addId(),
          ...result
        };
        console.log(newContact);
        this.contacts.push(newContact);
        this.contactService.saveContactsLocalStorage(this.contacts);
        this.filterContacts();
      }
    });
  }

  addId(): number {
    const maxNum = this.contacts.reduce((max, contact) => contact.id > max ? contact.id : max, 0);
    return maxNum + 1;
  }
}
