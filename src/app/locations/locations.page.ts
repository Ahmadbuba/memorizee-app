import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Interface } from 'readline';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  savedLocations = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://memorise-9e844-default-rtdb.firebaseio.com/locations.json')
      .subscribe((responseData) => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        this.savedLocations = [...postsArray];
        console.log(this.savedLocations);
      });
  }
}

export interface dataType {
  description: string;
  latitude: number;
  longitude: number;
}
