import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingHistoryComponent } from './components/shopping-history/shopping-history.component';

const routes: Routes = [
  {path: 'potrawy', component: DishesComponent},
  {path: 'koszyk', component: ShoppingCartComponent},
  {path: 'dodaj-danie', component: AddDishComponent},
  {path: 'szczegoly-dania/:id', component: DishDetailsComponent},
  {path: 'historia', component: ShoppingHistoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', pathMatch: 'full' , component: BusinessCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
