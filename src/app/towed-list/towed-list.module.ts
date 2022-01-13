import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TowedListPageRoutingModule } from './towed-list-routing.module';

import { TowedListPage } from './towed-list.page';
import { ModalComponent } from '../modal/modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TowedListPageRoutingModule
  ],
  declarations: [TowedListPage,ModalComponent],
  entryComponents: [ModalComponent]
})
export class TowedListPageModule {}
