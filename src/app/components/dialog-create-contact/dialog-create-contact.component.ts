import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-contact',
  imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-create-contact.component.html',
  styleUrl: './dialog-create-contact.component.scss'
})
export class DialogCreateContactComponent {
  public contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateContactComponent>) { }

  ngOnInit(): void {
    this.initContact();
  }

  initContact(): void {
    this.contactForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthDate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  saveContact(): void {
    if (this.contactForm.valid) {
      this.dialogRef.close(this.contactForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
