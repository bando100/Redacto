import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  // For demo purposes using in-memory collection, replace with actual API in production
  private pets: Pet[] = [
    { id: 1, name: 'Max', species: 'Dog', breed: 'Labrador', age: 3, ownerName: 'John Doe', ownerEmail: 'john@example.com', ownerPhone: '555-1234' },
    { id: 2, name: 'Bella', species: 'Cat', breed: 'Persian', age: 2, ownerName: 'Jane Smith', ownerEmail: 'jane@example.com', ownerPhone: '555-5678' }
  ];
  private nextId = 3;
  
  constructor(private http: HttpClient) { }

  // Get all pets
  getPets(): Observable<Pet[]> {
    return of(this.pets);
  }

  // Get pet by id
  getPet(id: number): Observable<Pet | undefined> {
    const pet = this.pets.find(p => p.id === id);
    return of(pet);
  }

  // Add new pet
  addPet(pet: Pet): Observable<Pet> {
    pet.id = this.nextId++;
    this.pets.push(pet);
    return of(pet);
  }

  // Update existing pet
  updatePet(pet: Pet): Observable<Pet | undefined> {
    const index = this.pets.findIndex(p => p.id === pet.id);
    if (index !== -1) {
      this.pets[index] = pet;
      return of(pet);
    }
    return of(undefined);
  }

  // Delete pet
  deletePet(id: number): Observable<boolean> {
    const index = this.pets.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pets.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
