import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
//import { InventoryListPage } from './inventoryManagement/inventory-list/inventory-list.page';
import { InventoryListPageModule } from './inventoryManagement/inventory-list/inventory-list.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'sign-up', component: SignupComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path: 'inventory-list',
    loadChildren: () => import('./inventoryManagement/inventory-list/inventory-list.module').then( m => m.InventoryListPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),InventoryListPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
