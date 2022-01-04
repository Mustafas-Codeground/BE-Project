import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TowedListPageRoutingModule } from './towed-list-routing.module';

import { TowedListPage } from './towed-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TowedListPageRoutingModule
  ],
  declarations: [TowedListPage]
})
export class TowedListPageModule {}
