import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactDetailsResolver } from './shared/services/contact-details.resolver';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

export const routes: Routes = [
    { path: "contact", component: ContactsListComponent },
    {
        path: "contact/:id",
        component: ContactDetailsComponent,
        resolve: { contactInfo: ContactDetailsResolver }
    },
    { path: '', redirectTo: '/contact', pathMatch: 'full' }
];
