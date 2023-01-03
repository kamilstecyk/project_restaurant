import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishComponent } from './components/dish/dish.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { FilteringComponent } from './components/filtering/filtering.component';
import { CheckboxesFilteringComponent } from './components/checkboxes-filtering/checkboxes-filtering.component';
import {MatSliderModule} from '@angular/material/slider';
import { DishesFilterPipe } from './Pipes/dishes-filter.pipe';
import { MinMaxFilteringPipe } from './Pipes/min-max-filtering.pipe';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShoppingHistoryComponent } from './components/shopping-history/shopping-history.component';
import { StarRatingFilterPipe } from './Pipes/star-rating-filter.pipe'; // <-- import the module
@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishComponent,
    AddDishComponent,
    StarRatingComponent,
    FilteringComponent,
    CheckboxesFilteringComponent,
    DishesFilterPipe,
    MinMaxFilteringPipe,
    ShoppingCartComponent,
    BusinessCardComponent,
    MenuComponent,
    DishDetailsComponent,
    ShoppingHistoryComponent,
    StarRatingFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    NgImageSliderModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
