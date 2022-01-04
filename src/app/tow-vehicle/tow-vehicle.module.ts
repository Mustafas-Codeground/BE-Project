import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TowVehiclePageRoutingModule } from './tow-vehicle-routing.module';

import { TowVehiclePage } from './tow-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TowVehiclePageRoutingModule
  ],
  declarations: [TowVehiclePage]
})
export class TowVehiclePageModule {}
