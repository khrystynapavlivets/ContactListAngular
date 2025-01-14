import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../../shared/interface/contact.interface';


@Component({
  selector: 'app-dialog-edit-contact',
  imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-edit-contact.component.html',
  styleUrl: './dialog-edit-contact.component.scss'
})
export class DialogEditContactComponent {
  public contacts: Contact[] = [];
  public contactEditForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public contactData: Contact) { }

  ngOnInit(): void {
    this.editContact(this.contactData);
  }

  editContact(contact: Contact): void {
    this.contactEditForm = this.fb.group({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      birthDate: contact.birthDate,
      email: contact.email,
      address: contact.address
    });
  }

  saveContact() {
    if (this.contactEditForm.valid) {
      this.dialogRef.close(this.contactEditForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
