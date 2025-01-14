import { catchError, Observable, of } from 'rxjs';
import { Contact } from '../interface/contact.interface';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ContactService } from './contact.service';

export const ContactDetailsResolver: ResolveFn<Contact> = (
  route: ActivatedRouteSnapshot
): Observable<Contact> => {
  const contactService = inject(ContactService);
  const id = Number(route.paramMap.get('id'));
  return contactService.getContact(id).pipe(
    catchError(error => {
      console.error(error);
      return of({} as Contact);
    })
  );
};