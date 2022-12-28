import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: 'potrawy', component: DishesComponent},
  {path: 'koszyk', component: ShoppingCartComponent},
  {path: 'dodaj-danie', component: AddDishComponent},
  {path: 'szczegoly-dania/:id', component: DishDetailsComponent},
  {path: '', pathMatch: 'full' , component: BusinessCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
