// src/app/components/duck-gallery/duck-gallery.component.ts
import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { CommonModule } from '@angular/common'; 
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-duck-gallery',
  standalone: true, 
  templateUrl: './duck-gallery.component.html',
  styleUrls: ['./duck-gallery.component.scss'],
  imports: [CommonModule] 
})
export class DuckGalleryComponent {
  imageUrls: string[] = [];
  randomImage: string | null = null;
  errorMessageGenerateRandomImage: string | null = null;
  errorMessageFetchImagesByNumber: string | null = null;

  constructor(private duckService: DuckService) {}
 

  fetchImages(number: number) {
    this.generateRandomImage();
    this.fetchImagesByNumber(number);
  }

  generateRandomImage() {
      this.duckService.getRandomImage().subscribe({
        next: (response) => {
          this.randomImage = response.url;
          this.errorMessageGenerateRandomImage = '';
        },
        error: (err) => {
          this.errorMessageGenerateRandomImage = err.message
          this.randomImage = null;
        },
      });
  }

  fetchImagesByNumber(number: number) {
      this.duckService.getImagesByNumber(number).subscribe({
        next: (response) => {
          this.imageUrls = response.urls;
          this.errorMessageFetchImagesByNumber = '';
        },
        error: (err) => {
          this.errorMessageFetchImagesByNumber = err.message
          this.imageUrls = [];
        },
      });
  }
 
}

