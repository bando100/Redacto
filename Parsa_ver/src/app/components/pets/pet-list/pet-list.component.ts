import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pet } from '../../../models/pet.model';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  loading = true;
  error = '';
  searchTerm = '';
  speciesFilter = '';
  sortColumn = 'name';
  sortDirection = 'asc';
  viewMode = 'table'; // 'table' or 'cards'

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.loading = true;
    this.petService.getPets()
      .subscribe({
        next: (data) => {
          this.pets = data;
          this.filterPets();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load pets';
          this.loading = false;
          console.error(err);
        }
      });
  }

  filterPets(): void {
    let filtered = [...this.pets];
    
    // Apply search term filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(term) ||
        pet.breed.toLowerCase().includes(term) ||
        pet.ownerName.toLowerCase().includes(term)
      );
    }
    
    // Apply species filter
    if (this.speciesFilter) {
      filtered = filtered.filter(pet => pet.species === this.speciesFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      const aValue = a[this.sortColumn as keyof Pet];
      const bValue = b[this.sortColumn as keyof Pet];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      }
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    this.filteredPets = filtered;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      // Toggle direction if same column is clicked
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.filterPets();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterPets();
  }

  deletePet(id: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe({
        next: (success) => {
          if (success) {
            this.pets = this.pets.filter(pet => pet.id !== id);
            this.filterPets();
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
}
