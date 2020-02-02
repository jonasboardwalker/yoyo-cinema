import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieApiService } from './services/movie-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from '../home/movie-list/movie-list.component';
import { FavoritesComponent } from '../home/favorites/favorites.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
