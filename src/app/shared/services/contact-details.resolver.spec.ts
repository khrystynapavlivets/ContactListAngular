import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ContactDetailsResolver } from './contact-details.resolver';
import { Contact } from '../interface/contact.interface';

describe('contactDetailsResolver', () => {
  const executeResolver: ResolveFn<Contact> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => ContactDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
