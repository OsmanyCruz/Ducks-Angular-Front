import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuckGalleryComponent } from './components/duck-gallery/duck-gallery.component';

export const routes: Routes = [
    { path: '', component: DuckGalleryComponent }, // Ruta principal
];
