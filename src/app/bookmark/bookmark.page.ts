import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: 'bookmark.page.html',
  styleUrls: ['bookmark.page.scss'],
})
export class BookmarkPage {
  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('f') myform: NgForm;
  map: GoogleMap;
  lat: any;
  lang: any;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.myform.value.description);
    let location = {
      description: this.myform.value.description,
      latitude: this.lat,
      longitude: this.lang,
    };
    this.http
      .post(
        'https://memorise-9e844-default-rtdb.firebaseio.com/locations.json',
        location
      )
      .subscribe();
    this.myform.resetForm();
    this.router.navigate(['/tabs', 'gallery']);
  }

  ionViewDidEnter() {
    this.createMap();
    this.printCurrentPosition();
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    const result = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
    this.lat = result.latitude;
    this.lang = result.longitude;
  };

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 9.0570752,
          lng: 7.471104,
        },
        zoom: 15,
      },
    });
    this.addMarkers;
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 9.0570752,
          lng: 7.471104,
        },
        title: 'localhost',
        snippet: 'Best place on earth',
      },
      {
        coordinate: {
          lat: 9.0570752,
          lng: 7.471104,
        },
        title: 'random place',
        snippet: 'Not sure',
      },
    ];

    await this.map.addMarkers(markers);
  }
}
