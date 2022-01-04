import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowVehiclePage } from './tow-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: TowVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TowVehiclePageRoutingModule {}
