import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class PetEditComponent implements OnInit {
  petForm!: FormGroup;
  petId!: number;
  submitted = false;
  loading = true;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPet();
  }

  loadPet(): void {
    this.petService.getPet(this.petId).subscribe({
      next: (pet) => {
        if (pet) {
          let petData = { ...pet };
          if (pet.lastVisit) {
            const date = new Date(pet.lastVisit);
            const formattedDate = date.toISOString().split('T')[0];
            petData = { ...pet, lastVisit: formattedDate as unknown as Date };
          }
          this.petForm.patchValue(petData);
          this.loading = false;
        } else {
          this.error = 'Pet not found';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Error loading pet data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.petForm.invalid) {
      return;
    }
    
    const formValue = {...this.petForm.value, id: this.petId};
    if (formValue.lastVisit) {
      formValue.lastVisit = new Date(formValue.lastVisit);
    }
    
    this.petService.updatePet(formValue).subscribe({
      next: (pet) => {
        if (pet) {
          this.router.navigate(['/pets']);
          alert('Pet updated successfully!');
        } else {
          this.error = 'Failed to update pet';
        }
      },
      error: (err) => {
        this.error = 'Error updating pet';
        console.error('Error updating pet:', err);
      }
    });
  }
}
