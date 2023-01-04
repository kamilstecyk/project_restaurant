import { Component } from '@angular/core';
import { MenuDataService } from '../../services/menu-data.service';
import { Dish } from 'src/app/dishes';
import { ActivatedRoute } from '@angular/router';
import { PriceTransformingService } from 'src/app/services/price-transforming.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { RatingService, Review, DishReviewRecord, DishRatingRecord } from 'src/app/services/rating.service';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.sass']
})
export class DishDetailsComponent {
  dish_object:Dish | null;
  given_id_of_object: number | null= -1;

  is_ingredient_list_extended = false;
  order_count:number = 0;
  currently_available:number = 0;

  imagesObjectArray:Object[] = []

  // review form
  myform: any; 
  sumbit_btn_was_clicked = false;

  // reviews 
  current_dish_reviews_subscription: any;
  dish_reviews: Review[] | any;

  constructor(private menu_data_service:MenuDataService, private activated_route:ActivatedRoute, public price_transforming_service: PriceTransformingService, private shooping_cart_service: ShoppingCartService, private router: Router, private rating_service: RatingService)
  {
    this.given_id_of_object = Number(this.activated_route.snapshot.paramMap.get('id'));
    this.dish_object  = menu_data_service.getDishWithId(this.given_id_of_object);
    console.log("Dish object details");
    console.log(this.given_id_of_object);
    console.log(this.dish_object?.imgs_paths);

    if(this.dish_object != null )
    {
      this.dish_object.imgs_paths.forEach(img_path => 
        {
          
          var img_object = {image: img_path, thumbImage: img_path};
          this.imagesObjectArray.push(img_object);
          
        });
      }
  }

  ngOnInit()
  {
    if(this.dish_object != null)
    {
      this.currently_available = this.shooping_cart_service.getDishAvailableCountFromId(this.dish_object.id);
      if(this.currently_available == -1 )
      {
        this.currently_available = this.dish_object.available_count;
      }

      this.order_count = this.shooping_cart_service.getHowManyOrderedFromId(this.dish_object.id);
      this.dish_reviews = this.rating_service.getDishReviews(this.dish_object.id);

      this.current_dish_reviews_subscription = this.rating_service.getCurrentReviewsDish().subscribe((value)=>
      {
        value = value as Review[];
        this.dish_reviews = value;
      });
    }

    // form 

    this.myform = new FormGroup({
      
      nick: new FormControl('', [this.nickValidator(), Validators.required]), 
      date: new FormControl('', [this.dateValidator()]),
      review_content: new FormControl('', [this.reviewContentValidator(), Validators.required]),
    });
  }

  onSubmit()
  {
    if (this.myform.valid) 
    {
      console.log("Review form submitted!");

      const username = this.myform.controls.nick.value;
      const date = this.myform.controls.date.value;
      const content = this.myform.controls.review_content.value;

      console.log(username +  " " + date + " " + content);

      if(this.given_id_of_object != null)
      {
        this.rating_service.addDishReview(this.given_id_of_object, username, date, content);
        alert("Dodano pomyslnie recenzje o daniu!");
        this.myform.reset();
        this.sumbit_btn_was_clicked = false;
      }
    }
    else 
    {
      console.log("Review form has not been submitted!");
      this.sumbit_btn_was_clicked = true;
    }
  }

  nickValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
  
      const value = control.value;

      var usernameRegex = /^[a-zA-Z0-9]+$/;
  
      if ( !usernameRegex.test(value) ) {
          return {badUsername:true};
      }
  
      return null;
    };
  }  

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
  
      const value = control.value;
      const value_timestamp = Date.parse(value);
      const date_chosen_input = new Date(value_timestamp);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
  
      if ( date_chosen_input >= tomorrow ) {
          return {chosenDateLaterThanToday:true};
      }
  
      return null;
    };
  }  

  reviewContentValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
  
      const value = control.value;
  
      if ( value?.length < 5 ) {
          return {textShorterThan50:true};
      }
      else if ( value?.length > 500 )
      {
        return {textLongerThan500:true};
      }
  
      return null;
    };
  }  

  handleExtensionOfIngredientList()
  {
    this.is_ingredient_list_extended = !this.is_ingredient_list_extended;
    const img_icon = document.getElementById("extend_list_btn");

    if(this.is_ingredient_list_extended)
    {
      let path_down_icon = '../../../assets/bxs-up-arrow.svg'
      img_icon?.setAttribute('src', path_down_icon)
    }
    else 
    {
      let path_up_icon = '../../../assets/bxs-down-arrow.svg'
      img_icon?.setAttribute('src', path_up_icon)
    }
  }

  handleAddDishToOrder()
  {
    if(this.currently_available > 0)
    {
      ++this.order_count;
      if(this.dish_object != null)
      {
        this.shooping_cart_service.increaseDishOrder(this.dish_object);
      }
      --this.currently_available;
    }
    else 
    {
      console.log("Nie mozna zamowic juz wiekszej ilosci tego dania!")
    }
  }

  handleRemoveDishFromOrder()
  {
    if(this.order_count > 0)
    {
      --this.order_count;
      if(this.dish_object != null)
      {
        this.shooping_cart_service.decreaseDishOrder(this.dish_object);
      }
      ++this.currently_available;
    }
    else
    {
      console.log("Nie masz tego dania jeszcze w koszyku")
    }
  }

  getFontColor()
  {
    if(this.currently_available > 3)
    {
      return 'green'
    }
    else if(this.currently_available > 0 && this.currently_available <= 3)
    {
      return 'orange'
    }
    else 
    {
      return 'red'
    }
  }

  removeFromMenu()
  {
    if(this.dish_object != null)
      {
        this.menu_data_service.removeDishFromMenu(this.dish_object);
        this.shooping_cart_service.removeFromCartIfThisDishHasBeenRemovedFromMenu(this.dish_object);
      }
  }

  backToDishes()
  {
    this.router.navigate(['/potrawy']);
  }
}
