import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, ReplaySubject } from 'rxjs';
import { dishes, Dish } from '../dishes';
import { DishRecord } from './shopping-cart.service';
import { FirebaseCrudDbOperationsService } from './firebase-crud-db-operations.service';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private menu_dishes: Array<Dish> = [];
  // private menu_dishes: Array<Dish> = [];
  private current_menu_dishes = new ReplaySubject(1);

  current_cuisine_types = new ReplaySubject(1);
  current_categories_of_dishes = new ReplaySubject(1);
  current_min_price_of_dish = new ReplaySubject(1);
  current_max_price_of_dish = new ReplaySubject(1);
  current_number_of_dishes = new ReplaySubject(1);

  // filtering data
  private types_of_cuisine: Array<string> = []
  private max_price: number = 1000;
  private min_price: number = 0;
  private categories_of_dishes: Array<string> = []


  constructor(private db_service: FirebaseCrudDbOperationsService) 
  {

    db_service.getAllDishes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
          //({ key: c.payload.key, ...c.payload.val() })
          // change key ->>>> to id 
        )
      )
    ).subscribe(data => 
      {

        // we reset dishes menu data
        this.menu_dishes = []
        console.log("=>>>>>>>>How many dishes: " + data.length);
        console.log(data);
        
        data.forEach((dish)=>
        {

          // we check if properties are not null, because we have such structure of dish object, firebase db does not store empty nodes
          if(dish.available_count != null && dish.category != null && dish.cuisine_type!= null && dish.description != null && dish.id != null && dish.name != null && dish.price != null)
          {
            if(dish.imgs_paths == null)
            {
              dish.imgs_paths = [];
            }

            if(dish.ingredients == null)
            {
              dish.ingredients = []
            }

            this.menu_dishes.push({ "id" : dish.id, "name" : dish.name, "cuisine_type" : dish.cuisine_type, "category" : dish.category, "ingredients" : dish.ingredients , "available_count" : dish.available_count , "price" : dish.price , "description" : dish.description , imgs_paths : dish.imgs_paths, key : dish.key });
          }

          this.getAndSendDataToSubjects();
        });

        console.log("Subscribed to menu dishes : ");
        console.log(this.menu_dishes);
       
      });


    // fetch("http://localhost:3000/dishes")
    // .then((response) => {

    //     if (response.status !== 200) {
    //         console.log("są błędy");
    //     }

    //     console.log("OK");
    //     return response.json();
    // })
    // .then(data=> {console.log(data);this.menu_dishes = data;}).then( ()=> {this.getAndSendDataToSubjects();console.log("Menu dishes array: ");
    // console.log(this.menu_dishes);} )
    // .catch((err) => {
    //     console.log("błąd podczas pobierania danych", err);
    //     // error msg on the screen
    // });

    console.log("Menu dishes array: ");
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
        if( dish.cuisine_type != null && !this.types_of_cuisine.includes(dish.cuisine_type))
        {
          this.types_of_cuisine.push(dish.cuisine_type);
        }
      } );
  }

  private getMaxAndMinPrice()
  {
    this.menu_dishes.forEach( dish => 
      {
        if(dish.price != null)
        {
        
          if(dish.price > this.max_price)
          {
            this.max_price = dish.price;
          }

          if(dish.price < this.min_price )
          {
            this.min_price = dish.price;
          }
        }
      } );

      console.log("max: " + this.max_price);
      console.log("min: " + this.min_price);
  }

  private getCategories()
  {
    this.menu_dishes.forEach( dish => 
      {
        if( dish.category != null &&  !this.categories_of_dishes.includes(dish.category))
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
    // this.menu_dishes.forEach( (item, index) => {
    //   if(item === dish_to_delete) 
    //   {
    //     this.menu_dishes.splice(index,1);
    //     console.log("Usunieto danie!");
    //   }
    // });
    // this.getAndSendDataToSubjects();


    // this.db_service.deleteDish

    if(dish_to_delete.key)
    {
      this.db_service.deleteDish(dish_to_delete.key).then(()=>
      {
        alert("Pomyślnie usunięto danie z menu!");
      }).catch(err =>
        {
          console.log(err);
          alert("Nie powiodło się usunięcie dania z menu!");
        });
    }
    
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
    if(this.menu_dishes != null && this.menu_dishes.length > 0)
    {
      return this.menu_dishes[this.menu_dishes.length-1].id;
    }

    return -1;
  }

  getDishWithId(id: number):Dish | null
  {
      console.log("Dish iterating id: ");
      console.log(this.menu_dishes);

      for(var dish of this.menu_dishes)
      {
        console.log("Dish iterating id: " + dish.id);

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

        if(item.available_count != null )
        {
          const left_available_count = item.available_count - ordered_dish.ordered_amount;
          if(left_available_count > 0)
          {
            item.available_count = left_available_count;

            if(item.key)
            {
              this.db_service.updateDish(item.key, { available_count : left_available_count })
            }
          }
          else
          {

            if(item.key)
            {
              this.db_service.deleteDish(item.key);
            }

            console.log("Usunieto danie!");
          }
        }
      }
    });

    this.getAndSendDataToSubjects();
  }

}
