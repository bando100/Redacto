import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetListComponent } from './components/pets/pet-list/pet-list.component';
import { PetAddComponent } from './components/pets/pet-add/pet-add.component';
import { PetEditComponent } from './components/pets/pet-edit/pet-edit.component';
import { PetDetailsComponent } from './components/pets/pet-details/pet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PetListComponent,
    PetAddComponent,
    PetEditComponent,
    PetDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
