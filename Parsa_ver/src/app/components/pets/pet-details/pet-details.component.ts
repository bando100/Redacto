import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class PetDetailsComponent implements OnInit {
  pet: Pet | undefined;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPet(id);
  }

  loadPet(id: number): void {
    this.petService.getPet(id).subscribe({
      next: (data) => {
        this.pet = data;
        this.loading = false;
        if (!data) {
          this.error = 'Pet not found';
        }
      },
      error: (err) => {
        this.error = 'Failed to load pet details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getSpeciesBadgeClass(species: string): string {
    switch(species) {
      case 'Dog': return 'bg-primary';
      case 'Cat': return 'bg-success';
      case 'Bird': return 'bg-info';
      case 'Fish': return 'bg-secondary';
      case 'Hamster': return 'bg-warning';
      default: return 'bg-dark';
    }
  }

  deletePet(id: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/pets']);
            alert('Pet successfully deleted.');
          } else {
            this.error = 'Failed to delete pet';
          }
        },
        error: (err) => {
          this.error = 'Error deleting pet';
          console.error('Error deleting pet:', err);
        }
      });
    }
  }
}
