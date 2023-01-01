import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { EventEmitter } from 'stream';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  displayDate;
  isModalOpen = false;
  path: string;
  date: Date = new Date();
  dateConvertToHours = this.date.getHours();
  dateConvertToMinutes = this.date.getMinutes();
  currentDate: String = `${this.dateConvertToHours}:${this.dateConvertToMinutes}`;

  constructor(public photoService: PhotoService) {}

  setOpenAndPath(isOpen, pathee, dateToDisplay) {
    this.path = pathee;
    this.displayDate = dateToDisplay;
    this.isModalOpen = isOpen;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addToGallery();
  }
}
