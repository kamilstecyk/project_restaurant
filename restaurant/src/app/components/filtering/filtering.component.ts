import { Component } from '@angular/core';
import { FilteringService } from 'src/app/services/filtering.service';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.sass'],
})
export class FilteringComponent {
  is_extended_filter_section = false;
  cuisine_types: string[] = []
  dish_categories: string[] = []
  rating_stars: string[] = ['1 gwiazdka', '2 gwiazdki', '3 gwiazdki', '4 gwiazdki', '5 gwiazdek'];
  max_dish_price: any;
  min_dish_price: any;
  current_number_of_dishes: any;

  cuisine_types_checked:string[] = []
  dish_categories_checked:string[] = []
  value_min: number = 0
  value_max: number = 100
  stars_chosen:string[] = []

  current_cuisine_types_subscription: any;
  current_dish_categories_subscription: any;
  current_min_price_subscription: any;
  current_max_price_subscription: any;
  current_number_of_dishes_subscription: any;

  constructor(public menu_data_service: MenuDataService,private filtering_service: FilteringService)
  {
    this.value_min = this.menu_data_service.getMinDishPrice();
    this.value_max = this.menu_data_service.getMaxDishPrice();

    this.current_cuisine_types_subscription = this.menu_data_service.current_cuisine_types.subscribe((value)=>
    {
      this.cuisine_types = value as string[];
    });
    this.current_dish_categories_subscription = this.menu_data_service.current_categories_of_dishes.subscribe((value)=>
    {
      this.dish_categories = value as string[];
    })
    this.current_min_price_subscription = this.menu_data_service.current_min_price_of_dish.subscribe((value)=>
    {
      this.min_dish_price = value as number;
    });
    this.current_max_price_subscription = this.menu_data_service.current_max_price_of_dish.subscribe((value)=>
    {
      this.max_dish_price = value as number;
    });
    this.current_number_of_dishes_subscription = this.menu_data_service.current_number_of_dishes.subscribe((value)=>
    {
      this.current_number_of_dishes = value as number;
    });
  }
  
  // ngOnInit()
  // {
  //   this.cuisine_types = this.menu_data_service.getTypesCuisine();
  //   this.dish_categories = this.menu_data_service.getDishesCategories();
  // }

  handleCheckboxesCuisineType(value: string[])
  {
    this.filtering_service.updateCuisineTypeChecked(value);
  }

  handleCheckBoxesDishCategory(value: string[])
  {
    this.filtering_service.updateDishCategory(value);
  }

  handleCheckboxesStars(value: string[])
  {
    this.filtering_service.updateStars(value);
  }

  handleMaxPriceDish()
  {
    this.filtering_service.updateMaxValue(this.value_max);
  }

  handleMinPriceDish()
  {
    this.filtering_service.updateMinValue(this.value_min);
  }

  handleExtendingFilteringParameters()
  {
    this.is_extended_filter_section = !this.is_extended_filter_section;
  }
}
