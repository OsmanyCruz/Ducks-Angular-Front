// src/app/components/duck-gallery/duck-gallery.component.ts
import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-duck-gallery',
  standalone: true, 
  templateUrl: './duck-gallery.component.html',
  styleUrls: ['./duck-gallery.component.css'],
  imports: [CommonModule] 
})
export class DuckGalleryComponent {
  imageUrls: string[] = [];
  randomImage: string | null = null;

  constructor(private duckService: DuckService) {}
 

  generateRandomImage() {
    this.duckService.getRandomImage().subscribe(response => {
      this.randomImage = response.url;
    });
  }

  fetchImagesByNumber(number: number) {
    this.duckService.getImagesByNumber(number).subscribe(response => {
      this.imageUrls = response.urls;
    });
  }
}
