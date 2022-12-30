import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, ReplaySubject } from 'rxjs';
import { dishes, Dish } from '../dishes';
import { DishRecord } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private menu_dishes: Array<Dish> = dishes;
  private current_menu_dishes = new ReplaySubject(1);

  current_cuisine_types = new ReplaySubject(1);
  current_categories_of_dishes = new ReplaySubject(1);
  current_min_price_of_dish = new ReplaySubject(1);
  current_max_price_of_dish = new ReplaySubject(1);
  current_number_of_dishes = new ReplaySubject(1);

  // filtering data
  private types_of_cuisine: Array<string> = []
  private max_price: number = -10000;
  private min_price: number = 10000;
  private categories_of_dishes: Array<string> = []

  constructor() 
  {
    this.getAndSendDataToSubjects();

    console.log(this.menu_dishes);
  }

  getAndSendDataToSubjects()
  {
    this.resetParametersOfFiltering()

    this.getCuisineTypes();
    this.getMaxAndMinPrice();
    this.getCategories();

    this.current_cuisine_types.next(this.types_of_cuisine);
    this.current_categories_of_dishes.next(this.categories_of_dishes);
    this.current_min_price_of_dish.next(this.min_price);
    this.current_max_price_of_dish.next(this.max_price);
    this.current_number_of_dishes.next(this.menu_dishes.length);

    this.current_menu_dishes.next(this.menu_dishes);
  }

  resetParametersOfFiltering()
  {
    this.types_of_cuisine.splice(0);
    this.max_price = -10000;
    this.min_price = 10000;
    this.categories_of_dishes.splice(0);
  }

  private getCuisineTypes()
  {
    this.menu_dishes.forEach( dish => 
      {
        if(!this.types_of_cuisine.includes(dish.cuisine_type))
        {
          this.types_of_cuisine.push(dish.cuisine_type);
        }
      } );
  }

  private getMaxAndMinPrice()
  {
    this.menu_dishes.forEach( dish => 
      {
        
        if(dish.price > this.max_price)
        {
          this.max_price = dish.price;
        }

        if(dish.price < this.min_price )
        {
          this.min_price = dish.price;
        }

      } );

      console.log("max: " + this.max_price);
      console.log("min: " + this.min_price);
  }

  private getCategories()
  {
    this.menu_dishes.forEach( dish => 
      {
        if(!this.categories_of_dishes.includes(dish.category))
        {
          this.categories_of_dishes.push(dish.category);
        }
      } );

      console.log(this.categories_of_dishes);
  }

  public getTypesCuisine()
  {
    return this.types_of_cuisine;
  }

  public getDishesCategories()
  {
    return this.categories_of_dishes;
  }

  public getMaxDishPrice()
  {
    return this.max_price;
  }
  
  public getMinDishPrice()
  {
    return this.min_price;
  }

  getDishes()
  {
    return this.current_menu_dishes.asObservable();
  }

  getAllDishes()
  {
    return this.menu_dishes;
  }

  removeDishFromMenu(dish_to_delete: Dish)
  {
    this.menu_dishes.forEach( (item, index) => {
      if(item === dish_to_delete) 
      {
        this.menu_dishes.splice(index,1);
        console.log("Usunieto danie!");
      }
    });

    this.getAndSendDataToSubjects();
  }

  addDishToMenu(dish_to_add: Dish)
  {
    this.menu_dishes.push(dish_to_add);
    console.log("Dishes all: ");
    console.log(this.menu_dishes);
    this.getAndSendDataToSubjects();
  }

  getLastId() 
  {
    if(this.menu_dishes.length > 0)
    {
      return this.menu_dishes[this.menu_dishes.length-1].id;
    }

    return -1;
  }

  getDishWithId(id: number):Dish | null
  {
      for(var dish of dishes)
      {
        if(dish.id === id )
        {
          return dish as Dish;
        }
      }
      
      return null;
  }

  removeBoughtAmountOfDish(ordered_dish:DishRecord)
  {
    this.menu_dishes.forEach( (item, index) => {
      if(item === ordered_dish.dish) 
      {

        const left_available_count = item.available_count - ordered_dish.ordered_amount;
        if(left_available_count > 0)
        {
          item.available_count = left_available_count;
        }
        else
        {
          this.menu_dishes.splice(index,1);
          console.log("Usunieto danie!");
        }
      }
    });

    this.getAndSendDataToSubjects();
  }

}
