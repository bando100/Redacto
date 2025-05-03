import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class PetAddComponent {
  petForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {
    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      species: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0)]],
      ownerName: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required, Validators.email]],
      ownerPhone: ['', [Validators.required]],
      lastVisit: [''],
      notes: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.petForm.invalid) {
      return;
    }
    
    // Convert lastVisit string to Date object if present
    const formValue = {...this.petForm.value};
    if (formValue.lastVisit) {
      formValue.lastVisit = new Date(formValue.lastVisit);
    }
    
    this.petService.addPet(formValue).subscribe({
      next: () => {
        this.router.navigate(['/pets']);
        alert('Pet added successfully!');
      },
      error: (err) => {
        console.error('Error adding pet:', err);
      }
    });
  }
}
