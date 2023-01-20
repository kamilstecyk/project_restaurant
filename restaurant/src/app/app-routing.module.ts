import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingHistoryComponent } from './components/shopping-history/shopping-history.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AdminGuardGuard } from './shared/guard/admin.guard';
import { UpdateDishComponent } from './components/update-dish/update-dish.component';
import { AdminOrManagerGuard } from './shared/guard/admin-or-manager.guard';
import { DishesManagerComponent } from './components/dishes-manager/dishes-manager.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoggedGuard } from './shared/guard/logged.guard';

const routes: Routes = [
  {path: 'potrawy', component: DishesComponent },
  {path: 'koszyk', component: ShoppingCartComponent, canActivate :[AuthGuard] },
  {path: 'dodaj-danie', component: AddDishComponent, canActivate :[AdminOrManagerGuard] },
  {path: 'szczegoly-dania/:id', component: DishDetailsComponent } ,
  {path: 'historia', component: ShoppingHistoryComponent, canActivate :[AuthGuard] },
  {path: 'zaaktualizuj-danie/:key', component: UpdateDishComponent, canActivate : [AdminOrManagerGuard] },
  {path: 'login', component: LoginComponent, canActivate : [LoggedGuard] },
  {path: 'register', component: RegisterComponent, canActivate : [LoggedGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate : [LoggedGuard] },
  {path: 'zarzadaj-daniami' , component: DishesManagerComponent, canActivate : [AdminOrManagerGuard] },
  {path: 'panel-admina', component: AdminPanelComponent, canActivate : [AdminGuardGuard] },
  {path: '', pathMatch: 'full' , component: BusinessCardComponent },
  {path: '**', component: BusinessCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
