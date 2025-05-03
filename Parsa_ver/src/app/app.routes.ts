import { Routes } from '@angular/router';
import { PetListComponent } from './components/pets/pet-list/pet-list.component';
import { PetAddComponent } from './components/pets/pet-add/pet-add.component';
import { PetEditComponent } from './components/pets/pet-edit/pet-edit.component';
import { PetDetailsComponent } from './components/pets/pet-details/pet-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  { path: 'pets', component: PetListComponent },
  { path: 'pets/add', component: PetAddComponent },
  { path: 'pets/edit/:id', component: PetEditComponent },
  { path: 'pets/:id', component: PetDetailsComponent },
  { path: '**', redirectTo: '/pets' }
];
