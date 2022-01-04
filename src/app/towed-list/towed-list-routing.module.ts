import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowedListPage } from './towed-list.page';

const routes: Routes = [
  {
    path: '',
    component: TowedListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TowedListPageRoutingModule {}
