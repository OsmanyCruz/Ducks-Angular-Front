// src/app/components/home/home.component.ts
import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule] 
})
export class HomeComponent {
  randomImage: string | null = null;
  imageUrls: string[] = [];

  constructor(private duckService: DuckService) {}

  generateRandomImage() {
    this.duckService.getRandomImage().subscribe(response => {
      this.randomImage = response.url;
      this.imageUrls = []; // Limpiamos la lista de imágenes para evitar duplicados
    });
  }

  fetchImagesByNumber(number: number) {
    this.duckService.getImagesByNumber(number).subscribe(response => {
      this.imageUrls = response.urls;
      this.randomImage = null; // Limpiamos la imagen aleatoria para evitar duplicados
    });
  }
}
