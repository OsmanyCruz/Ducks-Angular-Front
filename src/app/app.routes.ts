import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DuckGalleryComponent } from './components/duck-gallery/duck-gallery.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Ruta principal
    { path: 'gallery', component: DuckGalleryComponent }, // Ruta de la galería
];
