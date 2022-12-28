import { Component } from '@angular/core';
import { DishesFilterPipe } from 'src/app/Pipes/dishes-filter.pipe';
import { FilteringService } from 'src/app/services/filtering.service';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { Dish } from 'src/app/dishes';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.sass'],
})
export class DishesComponent {
  dishes_data:  Array<Dish> = []
  current_dishes_data_subscirption: any;

  cuisine_types_checked: string[] = [];
  cuisine_types_subscription: any;

  dishes_categories_checked: string[] = [];
  dishes_categories_subscription: any;

  stars_rating_checked: string[] = [];
  stars_rating_subscription: any;

  min_value_chosen: number = 0;
  min_value_chosen_subscription: any;

  max_value_chosen: number = 100;
  max_value_chosen_subscription: any;

  // TODO 
  // star rating filtering 
  constructor(private menu_data_service:MenuDataService,  public filtering_service:FilteringService)
  {
    this.current_dishes_data_subscirption = menu_data_service.getDishes().subscribe((value) => 
    {
            console.log(value + " - received");

      this.dishes_data = Object.assign([], value) as  Array<Dish>;
    });

    this.cuisine_types_subscription = filtering_service.getCuisineTypes().subscribe(value=>
      {
        this.cuisine_types_checked =  Object.assign([], value);
        console.log("Changed - values: " + this.cuisine_types_checked);
        // this.filtered_data = this.dishFilter.transform(this.dishes_data, value as string[], 'cuisine_type')
    });

    this.dishes_categories_subscription = filtering_service.getDishesCategoryChecked().subscribe(value=>
      {
        this.dishes_categories_checked =  Object.assign([], value);
        console.log("Changed - values: " + this.dishes_categories_checked);
      });

    this.stars_rating_subscription = filtering_service.getStarsChosen().subscribe(value=>
      {
        this.stars_rating_checked =  Object.assign([], value);
        console.log("Changed - values: " + this.stars_rating_checked);
    });

    this.min_value_chosen_subscription = filtering_service.getMinDishValue().subscribe(value=>
      {
        this.min_value_chosen =  value as number;
        console.log("Changed - values: " + this.min_value_chosen);
    });

    this.max_value_chosen_subscription = filtering_service.getMaxDishValue().subscribe(value=>
      {
        this.max_value_chosen =  value as number;
        console.log("Changed - values: " + this.max_value_chosen);
    });
  } 

  ngOnInit()
  {
    // this.dishes_data = this.menu_data_service.getDishes();
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this.cuisine_types_subscription.unsubscribe();
     this.dishes_categories_subscription.unsubscribe();
     this.stars_rating_subscription.unsubscribe();
     this.min_value_chosen_subscription.unsubscribe();
     this.max_value_chosen_subscription.unsubscribe();
     this.current_dishes_data_subscirption.unsubscribe();
   }
}
