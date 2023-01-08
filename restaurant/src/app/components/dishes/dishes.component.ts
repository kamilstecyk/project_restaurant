import { Component } from '@angular/core';
import { FilteringService } from 'src/app/services/filtering.service';
import { Dish } from 'src/app/dishes';
import { MenuDataService } from 'src/app/services/menu-data.service';

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

  stars_rating_checked: number[] = [];
  stars_rating_subscription: any;

  min_value_chosen: number = 0;
  min_value_chosen_subscription: any;

  max_value_chosen: number = 100;
  max_value_chosen_subscription: any;

  // paginator
  page: number = 1;
  count: number = 2;
  tableSize: number = 2;
  tableSizes: any = [1, 2, 3, 6, 9, 12];

  downloading_dishes = true;

  fetchDishes(): void {
    this.current_dishes_data_subscirption = this.menu_data_service.getDishes().subscribe((value) => 
    {
      this.dishes_data = Object.assign([], value) as  Array<Dish>;
      this.count = this.dishes_data.length;
      this.page = 1;
      console.log("Got fetch dishes: ");
      console.log(this.dishes_data);
      this.downloading_dishes = false;
    });
  }

  // TODO 
  // star rating filtering 
  constructor(private menu_data_service:MenuDataService,  public filtering_service:FilteringService)
  {
    this.fetchDishes();
    this.min_value_chosen = this.menu_data_service.getMinDishPrice();
    this.max_value_chosen = this.menu_data_service.getMaxDishPrice();

    this.cuisine_types_subscription = filtering_service.getCuisineTypes().subscribe(value=>
      {
        this.cuisine_types_checked =  Object.assign([], value);  
        this.page = 1;    
    });

    this.dishes_categories_subscription = filtering_service.getDishesCategoryChecked().subscribe(value=>
      {
        this.dishes_categories_checked =  Object.assign([], value);
        this.page = 1;    
      });

    this.stars_rating_subscription = filtering_service.getStarsChosen().subscribe(value =>
      {
        this.stars_rating_checked =  Object.assign([], value);
        this.page = 1;    
    });

    this.min_value_chosen_subscription = filtering_service.getMinDishValue().subscribe(value=>
      {
        this.min_value_chosen =  value as number;
        this.page = 1;    
    });

    this.max_value_chosen_subscription = filtering_service.getMaxDishValue().subscribe(value=>
      {
        this.max_value_chosen =  value as number;
        this.page = 1;    
    });

    var x = window.matchMedia("(max-width: 600px)")
    this.changeItemsPerPageIfItIsPhone(x)

  } 

  ngOnInit()
  {
    setTimeout(()=>
    {
      if(this.dishes_data.length == 0)
      {
        this.downloading_dishes = false;
        console.log("There is no dish in db");
      }
    }, 2000);
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

   handlePageChange(event: any) {
    this.page = event;
  }

  handlePageSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  changeItemsPerPageIfItIsPhone(x:any) {
    if (x.matches) { // If media query matches
      this.tableSize = 1;
    }
  }
}
