import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pet {
  id: number;
  name: string;
  birthDate: string;
  color: string;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent {
  
  allPets: Pet[] = [];

  
  newPet = {
    name: '',
    birthDate: '',
    color: ''
  };

  addPet() {
    console.log('✅ addPet() called');
    if (this.newPet.name && this.newPet.birthDate && this.newPet.color) {
      const newId = this.allPets.length > 0
        ? this.allPets[this.allPets.length - 1].id + 1
        : 1;

      const newPetObject: Pet = {
        id: newId,
        name: this.newPet.name,
        birthDate: this.newPet.birthDate,
        color: this.newPet.color
      };

      this.allPets.push(newPetObject);
      console.log('🟢 Pet added:', newPetObject);
      console.log('📦 Current pets:', this.allPets);

      
      this.newPet = { name: '', birthDate: '', color: '' };
    } else {
      console.warn('⚠️ Missing fields – pet not added');
    }
  }

  removePet(id: number) {
    this.allPets = this.allPets.filter(p => p.id !== id);
  }
}
