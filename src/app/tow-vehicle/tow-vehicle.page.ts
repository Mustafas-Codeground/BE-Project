/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Platform } from '@ionic/angular';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tow-vehicle',
  templateUrl: './tow-vehicle.page.html',
  styleUrls: ['./tow-vehicle.page.scss'],
})
export class TowVehiclePage implements OnInit {

  addVehicle: FormGroup;
  latitude;
  longitude;
  accuracy;
  address='';
  isAndroid: boolean;

  geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 500
  };

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 3
  };

  constructor(
    private fb: FormBuilder,
    private platform: Platform,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private nativeGeocoder: NativeGeocoder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.locationInit();

    this.addVehicle = this.fb.group({
      regn: ['',[Validators.required, Validators.pattern('[A-z]{2}[0-9]{2}[A-z]{2}[0-9]{4}')]]
    });
  }

  async locationInit() {
    // check if platform is android
    if(this.platform.is('android')) {
      this.isAndroid = true;
      await this.checkPermission();
    } else {
      this.isAndroid = false;
      await this.currentPosition();
    }
    return;
  }

  // check if app has permission to enable GPS, if not call request func
  async checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    .then(async res => {
      if(res.hasPermission){
        await this.enableGPS();
      } else {
        await this.locationPermission();
      }
    }, error => {
      console.error('Error checking permission: '+error);
      alert(error);
    }
    );
    return;
  }

  // if app doesn't have permisison then request for permission and call enable GPS func
  async locationPermission() {
    this.locationAccuracy.canRequest().then(async (can: boolean) => {
      if(can) {
        await this.enableGPS();
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
        .then( async () => {
          await this.enableGPS();
        }, error => {
          console.error('Error requesting location permission: '+error);
          alert(error);
        }
        );
      }
    });
    return;
  }

  // enable GPS from within the app
  async enableGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
    .then( async () => {
      await this.currentPosition();
    }, error => {
      console.error('Error starting GPS: '+error);
      alert(error);
    }
    );
    return;
  }

  // get current location of the device, and retrieve address from it using func
  async currentPosition() {
    this.geolocation.getCurrentPosition(this.geoOptions).then(async res => {
      console.log(res);
      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;
      this.accuracy = res.coords.accuracy;
      await this.getGeoencoder(res.coords.latitude, res.coords.longitude);
    }).catch(err => {
      console.error('Error getting curent location: '+err);
    });
    return;
  }

  async getGeoencoder(lat, lon) {
    this.nativeGeocoder.reverseGeocode(lat, lon, this.geoEncoderOptions)
    .then(async res => {
      console.log(res);
      console.log(res[0]);
      this.address = await this.generateAddress(res[0]);
    });
    return;
  }

  async generateAddress(add) {
    const obj=[];
    let address = '';
    for(let key in add) {
      obj.push(add[key]);
    }
    obj.reverse();
    for(let val in obj) {
      if(obj[val].length) {
        address += obj[val]+', ';
      }
    }
    return address;
  }

  async submit(form) {
    await this.locationInit();

    let data = {
      regn: form.regn,
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.address
    };

    console.log(data);
    this.apiService.post('addVehicle.php', data).subscribe(async res => {
      console.log(res);
      alert(res);
    });
  }

  getError() {
    if(this.addVehicle.get('regn').errors.required) {
      return 'Vehicle Number is required';
    }
    if(this.addVehicle.get('regn').errors.pattern) {
      return 'Enter valid Vehicle number';
    }
  }
}
