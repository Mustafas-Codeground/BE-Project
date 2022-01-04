import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TowVehiclePageRoutingModule } from './tow-vehicle-routing.module';

import { TowVehiclePage } from './tow-vehicle.page';

import { MaterialComponentModule } from '../material-component/material-component.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TowVehiclePageRoutingModule,
    MaterialComponentModule,
    ReactiveFormsModule
  ],
  declarations: [TowVehiclePage]
})
export class TowVehiclePageModule {}
