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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from "./shared/services/auth.service";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAYohbpga62vT9EvTZ-8lczRQdAEDYMW8M",
  authDomain: "restaurant-project-web-angular.firebaseapp.com",
  projectId: "restaurant-project-web-angular",
  storageBucket: "restaurant-project-web-angular.appspot.com",
  messagingSenderId: "335319972674",
  appId: "1:335319972674:web:d1eef6ab081d2ec4f726db"
};
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
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    NgImageSliderModule,
    MatPaginatorModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
