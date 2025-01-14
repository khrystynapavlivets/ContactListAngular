import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../interface/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts: Contact[] = [
    {
      id: 1,
      firstName: 'Pavlo',
      lastName: 'Pavliv',
      phoneNumber: '0633333333',
      birthDate: '1995-06-12',
      email: 'pavlo.pavliv@example.com',
      address: 'Lviv'
    },
    {
      id: 2,
      firstName: 'Petro',
      lastName: 'Petriv',
      phoneNumber: '0631222222',
      birthDate: '1992-03-25',
      email: 'petro.petriv@example.com',
      address: 'Lviv'
    },
    {
      id: 3,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      phoneNumber: '0631111111',
      birthDate: '1999-08-30',
      email: 'ivan.ivanov@example.com',
      address: 'Kyiv'
    },
    {
      id: 4,
      firstName: 'Sofia',
      lastName: 'Pavliv',
      phoneNumber: '0977777777',
      birthDate: '1995-12-14',
      email: 'sofia.pavliv@example.com',
      address: 'Lviv'
    },
    {
      id: 5,
      firstName: 'Ira',
      lastName: 'Petriv',
      phoneNumber: '0636666666',
      birthDate: '2000-06-20',
      email: 'ira.petriv@example.com',
      address: 'Kyiv'
    },
    {
      id: 6,
      firstName: 'Vasylyna',
      lastName: 'Vasylyna',
      phoneNumber: '0635555555',
      birthDate: '1991-01-26',
      email: 'vasylyna.vasylyna@example.com',
      address: 'Lviv'
    }
  ];


  getContact(id: number): Observable<Contact> {
    const contact = this.contacts.find(contact => contact.id === id);
    if (!contact) {
      throw new Error(`Id not found - ${id}`);
    }
    return of(contact);
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  saveContactsLocalStorage(contacts: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  loadContactsLocalStorage(): Contact[] {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      return JSON.parse(storedContacts);
    } else {
      return [];
    }
  }
}
