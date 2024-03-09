import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryListPage } from './inventory-list.page';
import { ViewInventoryComponent } from '../view-inventory/view-inventory.component';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { UpdateInventoryComponent } from '../update-inventory/update-inventory.component';

const routes: Routes = [
  {
    path: 'inventory-list',
    component: InventoryListPage,
    children: [
      {
        path: 'viewInventory',
        component: ViewInventoryComponent
      },
      {
        path: 'addInventory',
        component: AddInventoryComponent
      },
      {
        path: 'updateInventory',
        component: UpdateInventoryComponent
      }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryListPageRoutingModule {}
