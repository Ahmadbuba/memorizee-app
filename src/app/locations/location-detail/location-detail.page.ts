import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {
  description: string;
  latitude: number;
  longitude: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      console.log(param.get('lat'));
      this.description = param.get('name');
      this.latitude = Number(param.get('lat'));
      this.longitude = Number(param.get('lang'));
    });
  }
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  ionViewDidEnter() {
    this.createMap(this.latitude, this.longitude);

    this.printCurrentPosition();
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates.coords);
    let result = {
      latN: coordinates.coords.latitude,
      longN: coordinates.coords.longitude,
    };

    return result;
  };

  async createMap(latNum: number, langNum: number) {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: latNum,
          lng: langNum,
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
