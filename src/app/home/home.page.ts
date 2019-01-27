import {Component, OnInit} from '@angular/core';
import {Environment} from '@ionic-native/google-maps';
import {GoogleMap, GoogleMaps, GoogleMapsEvent, MarkerCluster} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {
  }

  public map: GoogleMap;

  ngOnInit(): void {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'YOUR_KEY',
      API_KEY_FOR_BROWSER_DEBUG: 'YOUR_KEY'
    });

    this.map = GoogleMaps.create('map', {});

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('map created');
      this.refresh();
    });
  }

  refresh() {
    const markers = [];

    let i = 1;
    while (1000 > i) {
      markers.push({
        MY_TYPE: 'location',
        MY_ID: 123,
        icon: {
          url: './assets/icon/favicon.png'
        },
        position: {
          lat: Math.random() / 50,
          lng: Math.random() / 50
        }
      });
      i++;
    }

    this.map.clear().then(() => {
      this.map.addMarkerCluster({
        boundsDraw: false,
        maxZoomLevel: 18,
        icons: [{url: './assets/icon/favicon.png', min: 2, max: 100000}],
        markers: markers
      }).then((cluster: MarkerCluster) => {
        console.log(cluster);
        cluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((marker: any) => {
          console.log(marker);
        });
      }, err => {
        console.log(err);
      });
    });
  }
}
