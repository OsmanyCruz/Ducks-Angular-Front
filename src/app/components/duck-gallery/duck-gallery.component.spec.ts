import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckGalleryComponent } from './duck-gallery.component';

describe('DuckGalleryComponent', () => {
  let component: DuckGalleryComponent;
  let fixture: ComponentFixture<DuckGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuckGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuckGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
